const PostController    = require('../controllers/posts.controller');
const multer            = require('multer');
const configMulter      = require('../config/multer.upload');
const upload            = multer(configMulter);

module.exports = app => {

    app
        .route('/posts')
        .get(PostController.list)
        .post(upload.single('image'), PostController.create)

    app
        .route('/post/like/:id')
        .post(PostController.like)

    app
        .route('/post/:id')
        .delete(PostController.remove)
}