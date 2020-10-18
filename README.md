# 熱門餐廳網3.0

使用 Node.js + Express框架 並利用mongodb作為後端資料庫，並利用expressRouter，建立具有RESTful風格的API，打造的餐廳美食搜索網站，再加上搜尋/排序餐廳資料等功能。

## 畫面截圖
![首頁](https://github.com/hooty868/git-remote-mac/raw/master/resturentList/public/image_screenshot/3.0type.png)

## Features - 產品功能

1.使用者可以新增一家餐廳
2.使用者可以瀏覽一家餐廳的詳細資訊
3.使用者可以瀏覽全部所有餐廳
4.使用者可以修改一家餐廳的資訊
5.使用者可以刪除一家餐廳
6.使用者可以排序評分高低

## Environment SetUp - 環境建置

- [[Visual Studio Code]](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [[Node.js]](https://nodejs.org/en/) - 後端語言
- [[npm]](https://www.npmjs.com/) - 套件管理
- [[Express.js]](https://expressjs.com/) - 後端框架
- [[MongoDB]](https://www.mongodb.com/) - 資料庫
- [[Mongoose]](https://www.npmjs.com/package/mongoose) - MongoDB 的 ODM 可以在程式中與資料庫溝通
- [[Method-override]](https://www.npmjs.com/package/method-override) - EXPRESS 的路由名稱，可以使用RESTful風格的API介面


## Installing - 專案安裝流程

1. 在terminal，Clone此專案至本機電腦中專案資料夾

```
git clone：https://github.com/pierceshih15/restaurantList.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurantList
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4.產生預設使用者及餐廳資料至 MongoDB

```
npm run insertSeeds  //執行增加資料至 MongoDB
終端顯示 `users insert done! 及 restaurants insert done!` 即完成新增資料

```
5.Ctrl+C *2  //連按兩下Ctrl+C結束批次工作

6.透過npm啟動專案

```
npm run dev //執行程式
終端顯示 `db is connected!` 即啟動完成
```

7. 開啟遊覽器，並收尋本地頁面

```
遊覽器網址輸入：http://localhost:3000/
```

## Contributor - 專案開發人員

> [hooty868](https://github.com/hooty868)
> [技術部落格](https://medium.com/@hooty868)
