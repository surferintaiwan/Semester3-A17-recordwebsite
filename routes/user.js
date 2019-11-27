const express = require('express')
const router = express.Router()

// 註冊頁面
router.get('/register', (req, res)=>{
    res.render('register')
})

// 送出註冊資料
router.post('/register', (req, res)=>{

})

// 登入頁面
router.get('/login', (req, res)=>{
    res.render('login')
})

// 送出登入資料
router.post('/login', (req, res)=>{

})

// 登出
router.post('/login', (req, res)=>{

})

// facebook登入用
router.get('', (req, res) => {

})

// facebook callback用
router.get(''), (req, res) => {

}

module.exports = router