const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const {authenticated} = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {
    // 先將首頁選擇類別的值準備好
    let categorySelected = {}
    let category = ''
    if (req.query.category === 'housing') {
        categorySelected.housing = true
        category = 'housing'
    } else if (req.query.category === 'transportation') {
        categorySelected.transportation = true
        category = 'transportation'
    } else if (req.query.category === 'entertainment') {
        categorySelected.entertainment = true
        category =  'entertainment'
    } else if (req.query.category === 'food') {
        categorySelected.food = true
        category = 'food'
    } else if (req.query.category === 'other') {
        categorySelected.other = true
        category = 'other'
    }
    
    // 再將首頁選擇年月的值準備好
    let dateInput = req.query.date
    let month = ''
    let year = ''
    if (dateInput) {
        month =  dateInput.slice(5, 7)
        year = dateInput.slice(0, 4)
    }

    // 將類別跟年月組合起來
    let findSetting = {}
    let userId = req.user._id
    let queryCategory = req.query.category || ''
    let queryDate = req.query.date || ''
    if (queryCategory === '' && queryDate === '') {
        findSetting = {userId}
    } else if (queryCategory === '' && queryDate) {
        findSetting = {
            userId,
            date: {
                $gte: new Date(`${year}-${month}-01`) ,
                $lte: new Date(`${year}-${month}-31`)
            }
        }
    } else if (queryCategory && queryDate === '') {
        findSetting = {
            userId,
            category
        }
    } else if (queryCategory && queryDate) {
        findSetting = {
            userId,
            category ,
            date: {
                $gte: new Date(`${year}-${month}-01`) ,
                $lte: new Date(`${year}-${month}-31`)
            }
        }
    }
    Record.find(findSetting)
        .sort({date: 'desc'})
        .exec((err, allRecords) => {
            if (err) return console.log(err)
            /* ??助教，請問這個有甚麼辦法可以解嗎?
            我想要在allRecords這個陣列中的物件插入一個icon，方便我views的使用
            ，但好像因為它是透過mongoose產出的陣列，所以沒辦法插入icon。
            所以只好開個新的陣列來存，但問題又來了，當我用forEach一個一個push資料到新陣列時，
            發現這個新陣列還是mongoose的陣列。
            像我下面這樣，newAllRecords其實就跟mongoose的陣列是一樣了Q"Q
            
            allRecords.forEach((eachRecord)=>{
                newAllRecords.push(eachRecord)
            })

            導致最後只能土法煉鋼，取出每個陣列，把每個key跟value取出再存進去。
            */

            // 把來自mongoose的陣列存成新的陣列，以方便塞入新的key來供view使用
            let newAllRecords = []
            let totalAmount = 0
            allRecords.forEach((eachRecord)=>{
                let yy = eachRecord.date.getFullYear()
                let mm = eachRecord.date.getMonth() + 1
                let dd = eachRecord.date.getDate()
                let eachRecordInObject = {
                    _id:eachRecord._id,
                    name: eachRecord.name,
                    category: eachRecord.category,
                    date: eachRecord.date,
                    amount: eachRecord.amount,
                    totalAmount: eachRecord.totalAmount,
                    userId: eachRecord.userId,
                    shortDate: `${yy}-${mm}-${dd}`
                }
                
                // 判斷不同類別將相應的icon，存入新陣列中的object
                if (eachRecord.category === 'housing') {
                    eachRecordInObject.icon = '<i class="col-2 fas fa-home col-2" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'transportation') {
                    eachRecordInObject.icon = '<i class="col-2 fas fa-shuttle-van" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'entertainment') {
                    eachRecordInObject.icon = '<i class="col-2 fas fa-grin-beam" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'food') {
                    eachRecordInObject.icon = '<i class="col-2 fas fa-utensils" style="font-size: 50px"></i>'
                } else if (eachRecord.category === 'other') {
                    eachRecordInObject.icon = '<i class="col-2 fas fa-pen" style="font-size: 50px"></i>'
                }
                totalAmount += eachRecord.amount
                newAllRecords.push(eachRecordInObject)
            })
            return res.render('index', {
                records: newAllRecords,
                totalAmount: totalAmount,
                categorySelected: categorySelected,
                dateInput: dateInput
            })       
        })       
})

module.exports = router