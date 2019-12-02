# 線上記帳-可註冊、登入、登出、新增餐廳資料
此網站使用node.js環境 + Express + mongoDB建立而成。
可供用戶註冊、登入、登出，管理自己每日消費紀錄。
--
## 網站截圖
![網站截圖](https://raw.githubusercontent.com/surferintaiwan/Semester3-A17-recordwebsite/master/login-page.png)

---

## Heroku demo link
[展示連結](https://recordwebsite.herokuapp.com/user/login)


## 功能說明
1. 使用者可註冊(註冊時，資料輸入有誤，皆會提示警告)
2. 使用者可登入(選擇註冊的帳號登入或以FACEBOOK登入)
3. 使用者可登出(登出後，會提示登出成功)
4. 使用者若未登入則強行自行輸入網址欲瀏覽記帳資料或新增記帳資料，則會自動跳轉至登入頁，並提示需要登入才可瀏覽

<若於登入後>

5. 首頁可瀏覽自己新增的所有帳目
6. 亦可瀏覽不同類別帳目，系統會顯示該類別帳目總金額
7. 可新增帳目(日期預設帶入使用者目前日期)
填寫帳目名稱、日期、金額、類別

8. 可編輯帳目
9. 可刪除帳目
---

## 開始使用
1. 下載本專案檔案至本地端
```
git clone https://github.com/surferintaiwan/Semester3-A17-recordwebsite
```
2. 於終端機打開專案檔案
```
cd Semester3-A17-recordwebsite
```
3. 於終端機安裝npm

此命令會查詢package.json看本專案使用了哪些套件，並自動安裝
```
npm install
```
4. 於終端機運行種子資料方便測試/seeds/seeder.js

```
npm run seeder
```
可用以下兩位使用者email及密碼登入進行測試，每個使用者皆以內含3筆帳目
* 使用者1: email: 1@test.com, 密碼:123456789
* 使用者2: email: 1@test.com, 密碼:987654321


5. 新增環境變數.env檔案
由於設置passport.facebook時，需要輸入你在facebook developer申請的app帳號跟密碼，有將之儲存在.env中，並且把.env放進.gitignore，這樣在上傳gitghub時，就不會看到環境變數。

步驟如下:
 * 前往facebook developer建立應用程式
 * 選擇產品為facebook登入
 * 在設定頁面拿到ID跟密碼
 * 在設定頁面輸入有效的OAuth重新導向URL>http://localhost:3000/auth/facebook/callback
 * 請在根目錄下新增.env
 * 檔案內儲存如下(記得輸入的內容不需要加上引號'')
 * 將.env寫進.gitignore
```
FACEBOOK_ID=你申請的ID
FACEBOOK_SECRECT=你申請的密碼
FACEBOOK_CALLBACK=callback路徑
```

```
// 範例
FACEBOOK_ID=123456789
FACEBOOK_SECRECT=jfjfeijkmx45775
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

6. 於終端機啟用並監聽伺服器
```
nodemon app.js
```
7. 於瀏覽器輸入 [http://localhost:3000/](http://localhost:3000/) 即可開始使用建立於本地端之餐廳網站

8. 若欲停止伺服器運行，可於終端機輸入Ctrl + C ，即可停用伺服器
---

## 環境配置
### Web Server
* node.js > v12.12.0
### DB
* mongoDB

### 套件
#### 前端美化
* jquery > 3.4.1
* bootstrap > 5.11.2
* popper
#### nodejs套件
* nodemon (監控伺服器，當有檔案更新會自動重啟伺服器)
* express (後端框架)
* express-handlebars
* mongoose (連接mongoDB資料庫)
* method-override (from以POST送出時，可依照需求將POST改為PUT或DELETE)
* express-session (可以截取cookie資訊、幫忙產生session儲存於資料庫)
* passport (用於登入、登出驗證，要與express-session搭配使用)
* passport-local (帳密是創建於資料庫，則使用此方式驗證)
* passport-facebook (用於facebook登入驗證)
* dot-env (用於隱藏私密訊息，如上一個套件需輸入facebook app帳密，可於上傳github時隱藏)
* bcryptjs 將密碼進行雜湊處理(在註冊及登入時皆會用到)
* connect-flash(可以將值送進req.locals，供view使用)

## 專案貢獻者
[Shawn](https://github.com/surferintaiwan)


