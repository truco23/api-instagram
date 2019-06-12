const PostController    = require('../controllers/posts.controller');
const multer            = require('multer');
const configMulter      = require('../config/multer.upload');
const upload            = multer(configMulter);

module.exports = app => {

    app
        .route('/posts')
        .post(upload.single('image'), PostController.create)
}