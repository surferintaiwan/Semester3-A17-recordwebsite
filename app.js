const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 使用express-handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 使用body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 啟用靜態資源
app.use(express.static('public'))

// 使用method-override
app.use(methodOverride('_method'))

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

