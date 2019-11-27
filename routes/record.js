const express = require('express')
const router = express.Router()

// 新增資料頁面
router.get('/new',(req,res) => {
    res.render('new')
})

// 送出新增資料
router.post('/new',(req,res) => {
    console.log(req.body)
    res.redirect('/')
})


// 編輯資料頁面
router.get('/edit',(req,res) => {
    res.render('edit')
})


// 送出編輯後資料頁面
router.put('/edit',(req,res) => {
    console.log(req.body)
})

// 送出刪除資料請求
router.delete('/delete', (req,res) => {
    
})

module.exports = router