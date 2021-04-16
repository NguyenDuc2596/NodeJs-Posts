//Nơi KET NOI CO SO DU LIEU CHINH
const express = require('express');
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') //cái này để tiếp nhập put,delete,... 

//Nhap mat khau routes
const posts = require('./routes/posts')

//Khởi động app
const app = express()

//Khoi dong Handlebars middleware(Nhung cai ben duoi deu tu tai lieu handlebars ra)
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

//Khoi dong bodyParserMiddleware(cái bên dưới đều từ tài lieeji bodyParser)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Khởi động methodOverride middleware
app.use(methodOverride('_method'))



//Khoi dong express middleware
app.use(express.json())

//Ket noi co so du lieu
connectDB()

//Một số router cơ bản,co the dua vao file rieng trong thu muc routes
app.get('/', (req, res) => {
    res.render('index') // cai render no se tu tim toi file trong views
})
app.get('/about', (req, res) => {
    res.render('about') // cai render no se tu tim toi file trong views
})


//Mang routes vao de su dung
app.use('/posts', posts) // moi duong dan posts deu duoc dua toi posts(js)

const PORT =process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server khoi dong tai port ${PORT}! `);
})