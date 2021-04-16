//Noi dung san pham(san pham gom nhung gi)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Tao models(dinh hinh(tao) nen san pham<--> san pham nhu the nao)
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // noi dung
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
// Cach xuat khau (dac biet)=> xuat khau postSchema thong qua ten 'post'
module.exports = mongoose.model('post', postSchema)