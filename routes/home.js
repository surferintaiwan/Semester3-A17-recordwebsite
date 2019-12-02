const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const {authenticated} = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {
    Record.find({userId:req.user._id})
        .sort({date: 'desc'})
        .exec((err, allRecords) => {
            if (err) return console.log(err)
            /*
            從資料庫取出的日期是年月日時分秒
            為了變成只有年月日，把allRecords陣列取出來，
            針對每個物件的date另存成shortDate轉成只有年月日
            */
            
            Record.findOne({userId:req.user._id})
                .sort({_id: -1})
                .select({totalAmount: 1})
                .exec((err, record) => {
                    if (err) return console.log(err)
                    if (record) {
                        return res.render('index', {
                            records: allRecords,
                           totalAmount: record.totalAmount
                        })            
                    } else {
                        return res.render('index', {
                            records: allRecords,
                            totalAmount: 0
                        })
                    }
                })    
        })       
})

// 使用者在首頁選擇不同類別，會顯示不同類別資料
router.get('/:category', authenticated, (req, res) => {
    let categoryForFind = {}
    let categoryForH1 = req.params.category
    if (req.params.category === 'housing') {
        categoryForFind.category = 'housing' 
    } else if (req.params.category === 'transportation') {
        categoryForFind.category = 'transportation'
    } else if (req.params.category === 'entertainment') {
        categoryForFind.category = 'entertainment'
    } else if (req.params.category === 'food') {
        categoryForFind.category = 'food'
    } else if (req.params.category === 'other') {
        categoryForFind.category = 'other'
    } 
    Record.find({userId:req.user._id})
            .find(categoryForFind)
            .sort({date: 'desc'})
            .exec((err, allRecords) => {
                let totalAmount = 0
                for (eachRecord of allRecords) {
                    totalAmount += eachRecord.amount
                }
                res.render('index', {
                    categoryForH1: categoryForH1,
                    records: allRecords,
                    totalAmount: totalAmount
                })
            })
})

module.exports = router