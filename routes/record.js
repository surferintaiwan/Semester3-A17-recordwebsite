const express = require('express')
const router = express.Router()

// 新增資料頁面
router.get('/new',(req,res) => {
    res.send('新增資料頁面')
})

// 送出新增資料
router.post('/new',(req,res) => {
    
})


// 編輯資料頁面
router.get('/edit',(req,res) => {
    
})


// 送出編輯後資料頁面
router.put('/edit',(req,res) => {
    
})

// 送出刪除資料請求
router.delete('/delete', (req,res) => {
    
})

module.exports = router