const mongoose      = require('mongoose');
const postModel     = mongoose.model('postModel');

let PostController = function () {};

PostController.prototype.create = async (req, res) => {

    console.log('Criando post');
    console.log(req.body);
    res.json({ok: true});
};

module.exports = new PostController();