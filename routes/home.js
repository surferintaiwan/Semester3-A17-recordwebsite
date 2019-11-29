const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')

router.get('/', (req, res) => {
    Record.find()
        .sort({date: 'desc'})
        .exec((err, allRecords) => {
            if (err) return console.log(err)
            /*
            從資料庫取出的日期是年月日時分秒
            為了變成只有年月日，把allRecords陣列取出來，
            針對每個物件的date另存成shortDate轉成只有年月日
            */
            
            /* ??助教，其實我本來是想要用下面這段，
            將轉變成年月日的日期存到shortDate裡，
            可就是存不進去，它只能讓我針對已有的key去改value而已。
            但我有把下面這段簡化，在下面實驗，map取出陣列內的物件後，
            該物件確實是可以任意插入新的key跟value進去，可為什麼這邊就不行了?
            是因為eachRecord這個物件不是一般物件，沒辦法隨便插入key跟value進去?
                        
            let newAllRecords = allRecords.map((eachRecord) => {
                let date = eachRecord.date
                let shortD = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
                eachRecord.shortDate = shortD
                console.log(eachRecord)
                console.log(Object.getPrototypeOf(eachRecord))
                return eachRecord
            })
            console.log(newAllRecords)
            */

            /*實驗map跟陣列型物件的使用
            let x = [{name:'shawn', time:100},{name:'tim', time:99}]
            let xx = x.map(item => {
                item.address= 1
                console.log(Object.getPrototypeOf(item))
                return item
            })
            console.log(xx)
            */
            Record.findOne()
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
router.get('/:category', (req, res) => {
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
    Record.find(categoryForFind)
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