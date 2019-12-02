const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
const mongoose = require('mongoose')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')


module.exports = passport => {
    // 使用passport-local
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
          User.findOne({ email: email }, (err, user) => {
            if (err) { return done(err)}
            if (!user) {
                return done(null, false, {message:'email還未註冊'}
            )} 
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err
              if (isMatch) {
                return done(null, user)
              } else {
                return done(null, false, {message: 'email或密碼錯誤'})
              }
            })
            
            /* 紀錄一下，這是使用bcrypt.compare()進行比對前的寫法
            if (user.password !== password) { 
              console.log(223)
                return done(null, false, {message: 'email或密碼輸入錯誤'} 
            )}
            return done(null, user)
            */
          })
          
        }
    ))
    
    // 使用passport-facebook
    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK,
            profileFields: ['email', 'displayName']
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({ email: profile._json.email})
            .then(user => {
                if (!user) {
                    let randomPassword = Math.random().toString(36).slice(-8)
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(randomPassword, salt, function(err, hash) {
                            const newUser = new User({
                                name :profile._json.name,
                                email: profile._json.email,
                                password: hash    
                            })
                            newUser.save().then(user=>{
                                return done(null, user)
                            }).catch(err => {
                                console.log(err)
                            })
                        })
                    })
                } else {
                    return done(null, user)
                }
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