const LocalStrategy = require('passport-local').Strategy
const mongoose = require('moongoose')

const User = require('../models/user.js')
module.exports = passport => {
    passport.use()
    
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });   
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
    })
}