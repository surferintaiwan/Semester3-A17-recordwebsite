const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 註冊頁面
router.get('/register', (req, res)=>{
    res.render('register')
})

// 送出註冊資料
router.post('/register', (req, res)=>{
    const {name, email, password, password2} = req.body
    User.findOne({email: email})
        .exec((err, user)=>{            
            // 檢查是否註冊過
            if (user) {
                console.log('已經註冊過')
                res.redirect('/user/login')
            } else {
                // 檢查名字、email、密碼1、密碼2是否都有輸入
                if (!name || !email || !password || !password2) {
                    console.log('有東西沒填')
                }
                // 檢查兩次密碼是否相同
                if (password !== password2) {
                    console.log('兩次密碼不一樣')
                }
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                })
                // 使用bcryptjs將密碼處理過
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        newUser.password = hash
                        newUser.save(err => {    
                            if (err) return console.log(err)
                            return res.redirect('/user/login')
                        })
                    })
                })
                
            } 
        })
})

// 登入頁面
router.get('/login', (req, res) => {
    res.render('login')
})

// 送出登入資料
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login' 
    })(req, res, next)
})

// 登出
router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/user/login')
})

// facebook登入用
router.get('', (req, res) => {

})

// facebook callback用
router.get(''), (req, res) => {

}

module.exports = router