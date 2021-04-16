//data base
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI') // lay cai link trong default


//ket noi vao co so du lieu
const connectDB = async () => { // co asyn phai co await, va kem try catch
    try {
        await mongoose.connect(db, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
            //4 cai tren deu la o tai lieu mongodb
        })

        console.log('Da ket noi co so du lieu');
    } catch (error) {
        console.log(error.message)
        process.exit(1) //1 la ma loi
    }
}
// xuat cai thang nay ra de dua vao cac fileJS khac
module.exports = connectDB
