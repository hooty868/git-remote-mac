# 熱門餐廳網2.0

使用 Node.js + Express框架 並利用mongodb作為後端資料庫，打造的餐廳美食搜索網站，再加上搜尋餐廳資料等功能。

## 畫面截圖
![首頁](https://github.com/hooty868/git-remote-mac/blob/master/resturentList/public/image_screenshot/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7.png)

## Features - 產品功能

1.使用者可以新增一家餐廳
2.使用者可以瀏覽一家餐廳的詳細資訊
3.使用者可以瀏覽全部所有餐廳
4.使用者可以修改一家餐廳的資訊
5.使用者可以刪除一家餐廳

## Environment SetUp - 環境建置

- [[Visual Studio Code]](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [[Node.js]](https://nodejs.org/en/) - 後端語言
- [[npm]](https://www.npmjs.com/) - 套件管理
- [[Express.js]](https://expressjs.com/) - 後端框架
- [[MongoDB]](https://www.mongodb.com/) - 資料庫
- [[Mongoose]](https://www.npmjs.com/package/mongoose) - MongoDB 的 ODM 可以在程式中與資料庫溝通


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
```

5.終端顯示 `users insert done! 及 restaurants insert done!` 即完成新增資料

```
Ctrl+C *2  //連按兩下Ctrl+C結束批次工作
````
6. 透過nodemon啟動專案

```
npm run dev //執行程式
終端顯示 `db is connected!` 即啟動完成
```

6. 開啟遊覽器，並收尋本地頁面

```
遊覽器網址輸入：http://localhost:3000/
```

## Contributor - 專案開發人員

> [hooty868](https://github.com/hooty868)
> [技術部落格](https://medium.com/@hooty868)
