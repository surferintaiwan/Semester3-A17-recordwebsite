const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const {authenticated} = require('../config/auth.js')

// 新增資料頁面
router.get('/new', authenticated, (req,res) => {
    res.render('new')
})

// 送出新增資料
router.post('/new', authenticated, (req,res) => {
    /* 先找到全部的帳目，只取出各筆帳目的amount部分
    ，重新加總先前的的金額是多少，並加上現在要新增的金額，算出totalAmount要的數字
    ，後面再連同要新增的資料一起送去儲存
    */
    Record.find({userId:req.user._id}, {amount: 1})
        .exec((err, allRecordsWithAmount)=>{
            if (err) return console.log(err)
            let allAmount = 0
            for (eachAmount of allRecordsWithAmount) {
                allAmount += eachAmount.amount
            }
            allAmount += Number(req.body.amount)
            const record = new Record({
                name: req.body.name,
                category: req.body.category,
                date: req.body.date,
                amount: req.body.amount,
                totalAmount: allAmount,
                userId: req.user._id
            })
            record.save( err => {
                if (err) return console.log(err)
                return res.redirect('/')
            })  
        })
})

// 編輯資料頁面
router.get('/edit/:id', authenticated, (req, res) => {
    // 透過_id找到資料，顯示出它的頁面    
    Record.findOne({userId:req.user._id, _id: req.params.id}, (err, record) => {
        if (err) return console.log(err)
        // 要把取出的date轉成只有年月日的shortDate，最後丟回去給view使用
        let yy = record.date.getFullYear()
        let mm = record.date.getMonth() + 1
        let dd = record.date.getDate()
        if (mm < 10) {
            mm = '0' + mm
        }
        if (dd < 10) {
            dd = '0' + dd
        }
        let shortDate = yy.toString() + '-' + mm.toString() + '-' + dd.toString()  
        let category = {}

        // 判斷使用者選的是什麼類型，讓編輯頁面上能夠先顯示原本的類型
        if (record.category === 'housing') {
            category.food = true
        } else if (record.category === 'transportation') {
            category.transportation = true
        } else if (record.category === 'entertainment') {
            category.entertainment = true
        } else if (record.category === 'food') {
            category.food = true
        } else if (record.category === 'other') {
            category.other = true
        }
        return res.render('edit',{
            record: record,
            category: category,
            date: shortDate
        })    
    })
})

// 送出編輯後資料頁面
router.put('/:id/edit', authenticated, (req,res) => {
    // 透過_id找到要改的資料
    Record.findOne({userId:req.user._id, _id: req.params.id}, (err, record) => {
        record.name = req.body.name,
        record.category = req.body.category,
        record.date = req.body.date,
        record.amount = req.body.amount,
        // 存回去
        record.save(err => {
            if (err) return console.log(err)
        })
    })
    
    // 接著找到最新_id的一筆資料，更新totalAmount
    Record.findOne({userId:req.user._id})
    .sort({_id: -1})
    .select({totalAmount: 1})
    .exec((err, record) => {
        // 把所有資料的amount都拿出來加總
        let allAmount = 0
        Record.find({userId:req.user._id}, {amount: 1})
        .exec((err, allRecordsWithAmount) => {
            if (err) return console.log(err)
            for (eachAmount of allRecordsWithAmount) {
                allAmount += eachAmount.amount
            }
            // 存回去資料庫
            record.totalAmount = allAmount
            record.save(err=> {
            if (err) return console.log(err)
            return res.redirect('/')
            })
        })
    })
})

// 送出刪除資料請求
router.delete('/:id/delete',authenticated , (req,res) => {
    // 刪除資料
    Record.remove({userId:req.user._id, _id: req.params.id}, (err) => {
        if (err) return console.log(err)
    })
    // 更新最新一筆資料的totalAmount
    Record.findOne()
        .sort({_id: -1})
        .select({totalAmount: 1})
        .exec((err, record) => {    
            // 把所有資料的amount拿出來加總
            let allAmount = 0
            Record.find({userId:req.user._id}, {amount: 1})
            .exec((err, allRecordsWithAmount) => {
                if (err) return console.log(err)
                for (eachAmount of allRecordsWithAmount) {
                    allAmount += eachAmount.amount
                }
                // 存回去資料庫
                record.totalAmount = allAmount
                record.save(err=> {
                if (err) return console.log(err)
                return res.redirect('/')
                })
            })
        })
})

module.exports = router