const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// 使用express-handlebars

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

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

