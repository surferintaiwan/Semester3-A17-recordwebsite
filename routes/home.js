const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const {authenticated} = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {
    Record.find({userId:req.user._id})
        .sort({date: 'desc'})
        .exec((err, allRecords) => {
            if (err) return console.log(err)
            
            /* ??助教，請問這個有甚麼辦法可以解嗎?
            我想要在allRecords這個陣列中的物件插入一個iconHTML，方便我views的使用
            ，但好像因為它是透過mongoose產出的陣列，所以沒辦法插入iconHTML。
            所以只好開個新的陣列來存，但問題又來了，當我用forEach一個一個push資料到新陣列時，
            發現這個新陣列還是mongoose的陣列。
            像我下面這樣，newAllRecords其實就跟mongoose的陣列是一樣了Q"Q
            
            allRecords.forEach((eachRecord)=>{
                newAllRecords.push(eachRecord)
            })

            導致最後只能土法煉鋼，取出每個陣列，把每個key跟value取出再存進去。
            */

            // 把來自mongoose的陣列存成新的陣列
            let newAllRecords = []
            allRecords.forEach((eachRecord)=>{
                let eachRecordInObject = {
                    _id:eachRecord._id,
                    name: eachRecord.name,
                    category: eachRecord.category,
                    date: eachRecord.date,
                    amount: eachRecord.amount,
                    totalAmount: eachRecord.totalAmount,
                    userId: eachRecord.userId,
                } 
                // 判斷不同類別將相應的icon存入新陣列
                if (eachRecord.category === 'housing') {
                    eachRecordInObject.icon = '<i class="fas fa-home col-2" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'transportation') {
                    eachRecordInObject.icon = '<i class="fas fa-shuttle-van" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'entertainment') {
                    eachRecordInObject.icon = '<i class="fas fa-grin-beam" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'food') {
                    eachRecordInObject.icon = '<i class="fas fa-utensils" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'other') {
                    eachRecordInObject.icon = '<i class="fas fa-pen" style="font-size: 50px"></i>'
                }
                newAllRecords.push(eachRecordInObject)
            })
            
            // 將日期轉成只有年月日
            


            Record.findOne({userId:req.user._id})
                .sort({_id: -1})
                .select({totalAmount: 1})
                .exec((err, record) => {
                    if (err) return console.log(err)
                    if (record) {
                        return res.render('index', {
                            records: newAllRecords,
                            totalAmount: record.totalAmount
                        })            
                    } else {
                        return res.render('index', {
                            records: newAllRecords,
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