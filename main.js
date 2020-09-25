const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const POSTER_URL = BASE_URL + "/portraits/";

const users = [];

// let data insert to dom html
const datapanel = document.querySelector("#data-panel");
function randomlist(data) {
    let raw_html = "";
    let count = 1;
    data.forEach((element) => {
        raw_html += `
          <div class="col-md-3">
            <div class="mb-2">
              <div class="card" data-pagenum="${count}">
                <img
                  src="${element.avatar}"
                  class="card-img-top"
                  alt="User information"
                />
                <div class="card-body">
                  <h4 class="surname">${element.surname}</h4>
                  <p class="email">${element.email}</p>
                </div>
                <div class="card-footer">
                  <button type="button" class="btn btn-outline-secondary btn-show-info" data-toggle="modal" data-target="#usermodal" data-id="${element.id}">info</button>
                  <button class="btn btn-outline-dark btn-outline-secondary btn-add-favorite" data-id="${element.id}">+</button>
                </div>
              </div>
            </div>
          </div>
    `;
        count++;
    });
    datapanel.innerHTML = raw_html;
}

function showusermodal(id) {
    const name = document.querySelector("#user-modal-name");
    const birthday = document.querySelector("#user-modal-birthday");
    const email = document.querySelector("#user-modal-email");
    const region = document.querySelector("#user-modal-region");
    const age = document.querySelector("#user-modal-age");
    const image = document.querySelector("#user-modal-image");
    axios.get(INDEX_URL + id).then((response) => {
        const data = response.data;
        //console.log(data);
        name.innerText = "Name:" + data.name;
        birthday.innerText = "birthday:" + data.birthday;
        email.innerText = "email:" + data.email;
        region.innerText = "region:" + data.region;
        age.innerText = "age:" + data.age;
        image.innerHTML = `<img src="${data.avatar}" alt="movie-poster" class="img-fluid">`;
    });
}

axios
    .get(`https://lighthouse-user-api.herokuapp.com/api/v1/users`)
    .then((response) => {
        users.push(...response.data.results);
        //console.log(users);
        randompaginatorpage(users.length);
        randomlist(userlist_slice(1));
    })
    .catch((err) => console.log(err));
// axios api get

//listen datapanel
datapanel.addEventListener("click", function onpanelclicked(event) {
    if (event.target.matches(".btn-show-info")) {
        showusermodal(event.target.dataset.id);
    } else if (event.target.matches(".btn-add-favorite")) {
        addToFavorite(Number(event.target.dataset.id));
    } else if (event.target.matches(".btn-add-delet")) {
        removeFromFavorite(event.target.dataset.id);
    }
});

//let favorite user can be picked up to browser tem storage
function addToFavorite(id) {
    const userFavoriteList =
        JSON.parse(localStorage.getItem("favoriteUsers")) || [];
    const FavoriteUser = users.find((user) => user.id === id);
    if (userFavoriteList.some((user) => user.id === id)) {
        return alert("此電影已經在收藏清單中！");
    }
    userFavoriteList.push(FavoriteUser);
    console.log(userFavoriteList);
    localStorage.setItem("favoriteUsers", JSON.stringify(userFavoriteList));
}

const paginator = document.querySelector("#page-item-list");
const PerPageNum = 12;
let pagenumbermax = 0;

function randompaginatorpage(amount) {
    const numberpage = Math.ceil(amount / PerPageNum);
    pagenumbermax = numberpage;
    let rawHTML = "";
    let pagenumber = 1;
    for (let count = 0; count < numberpage; count++) {
        rawHTML += `
  <li class="page-item"><a class="page-link" href="#" data-page="${pagenumber}">${pagenumber}</a></li>
  `;
        pagenumber++;
    }
    //console.log(rawHTML)
    paginator.innerHTML = rawHTML;
}

//caculate paginatorlist number return specify userarray
function userlist_slice(number) {
    const startindex = (number - 1) * PerPageNum;
    //console.log(startindex);
    return users.slice(startindex, startindex + PerPageNum);
}

//listen paginator number buttom to change page
let pagenumber = 1;
const paginatordata = document.querySelector("#page-item-list");
paginatordata.addEventListener("click", function changeShowPage(event) {
    if (event.target.tagName != "A") return;
    pagenumber = Number(event.target.dataset.page);
    console.log(pagenumber);
    if (showstatue === "listmode") {
        randomlist(userlist_slice(pagenumber));
    } else if (showstatue === "barmode") {
        randomlistbar(userlist_slice(pagenumber));
    }
});
const paginatorbackward = document.querySelector("#page-backward");
paginatorbackward.addEventListener("click", function pageBackwardShow(event) {
    if (pagenumber === 1) return;
    else {
        pagenumber--;
        if (showstatue === "listmode") {
            randomlist(userlist_slice(pagenumber));
        } else if (showstatue === "barmode") {
            randomlistbar(userlist_slice(pagenumber));
        }
        console.log(pagenumber);
    }
});

const paginatorforward = document.querySelector("#page-forward");
paginatorforward.addEventListener("click", function pageForwardShow(event) {
    if (pagenumber === pagenumbermax) return;
    else {
        pagenumber++;
        if (showstatue === "listmode") {
            randomlist(userlist_slice(pagenumber));
        } else if (showstatue === "barmode") {
            randomlistbar(userlist_slice(pagenumber));
        }
        console.log(pagenumber);
    }
});

//listen (bar/th) buttom
let showstatue = "listmode";
const barpage = document.querySelector("#fa-buttom");
barpage.addEventListener("click", function changeShowModel(event) {
    if (event.target.id === "fa-list-buttom") {
        showstatue = "listmode";
        randomlist(userlist_slice(pagenumber));
    } else if (event.target.id === "fa-bars-buttom") {
        showstatue = "barmode";
        randomlistbar(userlist_slice(pagenumber));
    }
});

//randon userlist in barmode
function randomlistbar(data) {
    let raw_html = "";
    data.forEach((dataitem) => {
        raw_html += ` 
<div class="container">
  <div class="row justify-content-between border-top pt-2 pb-2">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-4">
          <h4 class="surname">${dataitem.surname}</h4>
        </div>
        <div class="col-md-8">
          <p class="email">${dataitem.email}</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <button type="button" class="btn btn-outline-secondary btn-show-info" data-toggle="modal" data-target="#usermodal" data-id="${dataitem.id}">info</button>
                  <button class="btn btn-outline-dark btn-outline-secondary btn-add-favorite" data-id="${dataitem.id}">+</button>
    </div>
  </div>
</div>
`;
    });
    datapanel.innerHTML = raw_html;
}

//listen submit buttom
const SubmitBottom = document.querySelector("#search-submit");
const SubmitValue = document.querySelector("#search-input");
SubmitBottom.addEventListener("click", function submitBarValue(event) {
    event.preventDefault();
    let SearchResult = [];
    //Get user-specified data for search result//
    SearchResult = users.filter(function (item) {
        return item.surname
            .toLowerCase()
            .includes(SubmitValue.value.trim().toLowerCase());
    }); //nomatter user key result in lowercase or uppercase
    if (showstatue === "listmode") {
        randomlist(SearchResult);
    } else {
        randomlistbar(SearchResult);
    }
});

//randor favorite users view
const randorFavoriteList = document.querySelector("#favoriteUserIndex");
randorFavoriteList.addEventListener("click", function randorFavoriteUser(
    event
) {
    const favoriteUsersList = JSON.parse(localStorage.getItem("favoriteUsers"));
    if (showstatue === "listmode") {
        randomlist_favorite_list(favoriteUsersList);
    } else {
        randomlist_favorite_bar(favoriteUsersList);
    }
});
//
function randomlist_favorite_list(data) {
    let raw_html = "";
    let count = 1;
    data.forEach((element) => {
        raw_html += `
          <div class="col-md-3">
            <div class="mb-2">
              <div class="card" data-pagenum="${count}">
                <img
                  src="${element.avatar}"
                  class="card-img-top"
                  alt="User information"
                />
                <div class="card-body">
                  <h4 class="surname">${element.surname}</h4>
                  <p class="email">${element.email}</p>
                </div>
                <div class="card-footer">
                  <button type="button" class="btn btn-outline-secondary btn-show-info" data-toggle="modal" data-target="#usermodal" data-id="${element.id}">info</button>
                  <button class="btn btn-outline-dark btn-outline-secondary btn-add-delet" data-id="${element.id}">X</button>
                </div>
              </div>
            </div>
          </div>
    `;
        count++;
    });
    datapanel.innerHTML = raw_html;
}
//randon userlist in barmode
function randomlist_favorite_bar(data) {
    let raw_html = "";
    data.forEach((dataitem) => {
        raw_html += ` 
<div class="container">
  <div class="row justify-content-between border-top pt-2 pb-2">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-4">
          <h4 class="surname">${dataitem.surname}</h4>
        </div>
        <div class="col-md-8">
          <p class="email">${dataitem.email}</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <button type="button" class="btn btn-outline-secondary btn-show-info" data-toggle="modal" data-target="#usermodal" data-id="${dataitem.id}">info</button>
                  <button class="btn btn-outline-dark btn-outline-secondary btn-add-delet" data-id="${dataitem.id}">X</button>
    </div>
  </div>
</div>
`;
    });
    datapanel.innerHTML = raw_html;
}

function removeFromFavorite(id) {
    const favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers"));
    if (!favoriteUsers) return;
    const userlist = favoriteUsers.filter(function (item) {
        return item.id !== Number(id);
    });
    console.log(userlist);
    localStorage.setItem("favoriteUsers", JSON.stringify(userlist));
    if (showstatue === "listmode") {
        randomlist_favorite_list(userlist);
    } else {
        randomlist_favorite_bar(userlist);
    }
}
