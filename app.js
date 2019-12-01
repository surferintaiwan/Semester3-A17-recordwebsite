const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

// 使用moogoose
mongoose.connect('mongodb://localhost/record', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection
db.on('error',()=>{
    console.log('mongoDB error!')
})

db.on('open',()=>{
    console.log('mongoDB connected!')
})

// 使用express-handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 使用body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 啟用靜態資源
app.use(express.static('public'))

// 使用method-override
app.use(methodOverride('_method'))

// 使用express-session
app.use(session({
    secret: 'gogopower',
    resave: false,
    saveUninitialized: true,
}))

// 使用passport
app.use(passport.initialize())
app.use(passport.session())

// 使用config/passport.js
require('./config/passport.js')(passport)

// 儲存req.locals供views使用
app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
})

// routes
// /home
app.use('/', require('./routes/home.js'))
// /record
app.use('/user', require('./routes/user.js'))
// /user
app.use('/record', require('./routes/record.js'))


app.listen(3000, () => {
    console.log('http://localhost:3000 is listening!')
})

