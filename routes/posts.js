const express = require('express')
const router = express.Router()

// Load model
const Post = require('../models/Post')
/////////////////////////////////////////////////////////////////////////
//THÊM
// Hien thi form de tao bai viet moi
router.get('/add', (req, res) => {
    res.render('posts/add') // hiện thị nội dung backend ở views/posts/add.handlebars
})
// Tao post moi (do dùng mongoose nền cần async await)
router.post('/', async (req, res) => {
    const { title, text } = req.body // Nhiệm vụ h đưa vào cơ sở dữ liệu

    let errors = []
    if (!title) errors.push({ msg: 'Title required' })
    if (!text) errors.push({ msg: 'Text required' })
    if (errors.length > 0) res.render('posts/add', { title, text })
    else {
        const newPostData = { title, text } // cách viết mới của ES6 thay thế { title:title, text: text   }
        // title đầu là tên, title sau là dữ liệu

        const newPost = new Post(newPostData)//cái Post này là cái đã import vào
        await newPost.save() // cú pháp .save() = luu vào cơ sỏ dữ liệu
        res.redirect('/posts')  //redirect đưa người dùng quay lại tất cả  các posts(đường link web /posts)
    }
})
// Tìm kiếm
//Hiện thị tất cả các bài viết(posts)(làm việc vs database nên cần dùng async await)
router.get('/', async (req, res) => {
    // tạo mục tìm kiếm
    const posts = await Post.find().lean().sort({ date: -1 }) // sort({ date: -1 }): ý nghĩa bài viết mới sẽ đẩy lên đầu
    res.render('posts/index', { posts: posts }) // cách viết mới của ES6 thay thế { posts: posts } là {posts}
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SỬA(Update)
//Hiện thị form de người dùng thay đổi(FontEnd)
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean() // cú pháp req.params.id = là id đã lưu
    //req.params.id chính là href="/posts/edit/{{_id}} ở views/post/index.handlebars

    res.render('posts/edit', { post }) // cái { post } ở đây tác dụng dữ liệu không bị trắng
})
// Cập nhật thay đổi vào cơ sở dữ liệu(BackEnd)
router.put('/:id', async (req, res) => {
    const { title, text } = req.body // lấy dữ liệu trong cái body
    await Post.findOneAndUpdate({ _id: req.params.id }, { title, text }) // gồm điều kiện và data thay đổi
    // Mongoose tự tìm và cập nhập

    res.redirect('/posts')

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xóa(Delete)
router.delete('/:id', async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id })
    res.redirect('/posts')
})





module.exports = router