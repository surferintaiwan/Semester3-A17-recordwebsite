const mongoose = require('mongoose')
const User = require('../user.js')
const Record = require('../record.js')
const bcrypt = require('bcryptjs')
// 使用moogoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// 兩位使用者資料以及所屬的帳目
let usersData = [
    {
        name: '小明',
        email: '1@test.com',
        password: '123456789',
        records: [
            {name: '豬排便當', date:'2019-12-01', category: 'food', amount: 100, totalAmount: 100},
            {name: '搭車回家', date:'2019-12-01', category: 'transportation', amount: 150, totalAmount: 250},
            {name: '水龍頭', date:'2019-12-02', category: 'housing', amount: 250, totalAmount: 400}
        ]
        
    },
    {
        name: '小王',
        email: '2@test.com',
        password: '987654321',
        records: [
            {name: '鹹酥雞', date:'2019-11-30', category: 'food', amount: 100, totalAmount: 100},
            {name: '搭公車', date:'2019-11-30', category: 'transportation', amount: 10, totalAmount: 110},
            {name: '椅子', date:'2019-11-29', category: 'housing', amount: 950, totalAmount: 1060}
        ]
    }
]

// 與mongoDB連線
const db = mongoose.connection
db.on('error', () => {
    console.log('mongoDB error!')
})

db.on('open', () => {
    console.log('mongoDB connected!')
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(usersData[0].password, salt, (err, hash) => {
            const newUser = new User({
                name: usersData[0].name,
                email: usersData[0].email,
                password: hash
            })
            newUser.save((err,user) => {
                if (err) return console.log(err)
                for (record of usersData[0].records) {
                    let newRecord = new Record({
                        name: record.name,
                        date: record.date,
                        category: record.category,
                        amount: record.amount,
                        totalAmount: record.totalAmount,
                        userId: user._id
                    })
                    newRecord.save(err=>{
                        if (err) return console.log(err)
                    })
                }
            })  
        })
    })
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(usersData[1].password, salt, (err, hash) => {
            const newUser = new User({
                name: usersData[1].name,
                email: usersData[1].email,
                password: hash
            })
            newUser.save((err,user) => {
                if (err) return console.log(err)
                for (record of usersData[1].records) {
                    let newRecord = new Record({
                        name: record.name,
                        date: record.date,
                        category: record.category,
                        amount: record.amount,
                        totalAmount: record.totalAmount,
                        userId: user._id
                    })
                    newRecord.save(err=>{
                        if (err) return console.log(err)
                    })
                }
            })
        })
    })

    /* ??助教，請問為什麼兩次儲存都是第二個使用者小王呢?
    for (eachUserData of usersData) {
        console.log(eachUserData)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(eachUserData.password, salt, (err, hash) => {
                console.log(eachUserData)
                const newUser = new User({
                    name: eachUserData.name,
                    email: eachUserData.email,
                    password: hash
                })
                newUser.save((err, user) => {
                    if (err) return console.log(err)
                    console.log(`建立${eachUserData.name}成功`)
                })
                
            })    
        })
    }
    */
})