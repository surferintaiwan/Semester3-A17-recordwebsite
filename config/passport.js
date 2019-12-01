const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
module.exports = passport => {
  passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
          /* 好像有.then跟沒.then是一樣的?
          User.findOne({ email: email })
            .then(user => {
            if (!user) {
                return done(null, false, {message: '這個email不存在'})
            }
            if (user.password !== password) { 
                return done(null, false, {message: 'email或密碼輸入錯誤'})
            }
            return done(null, user)
          })
          */
          User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err)}
            if (!user) {
              console.log(123)
                return done(null, false, {message: '這個email不存在'} 
            )} 
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err
              if (isMatch) {
                return done(null, user)
              } else {
                return done(null, false, {message: 'email或密碼錯誤'})
              }
            })
            /* 這是使用bcrypt.compare()進行比對前的寫法
            if (user.password !== password) { 
              console.log(223)
                return done(null, false, {message: 'email或密碼輸入錯誤'} 
            )}
            return done(null, user)
            */
          })
          
        }
      ))
    
    
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });   
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user)
        })
    })
}