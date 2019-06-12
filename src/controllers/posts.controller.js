const mongoose      = require('mongoose');
const postModel     = mongoose.model('postModel');

let PostController = function () {};

PostController.prototype.create = async (req, res) => {

    try {
        
        const { author, place, description, hastag, like } = req.body;
        const { filename: image } = req.file;
    
        await postModel.create({author, place, description, hastag, like, image }, (error, post) => {

            if(error) {
                console.log(error.message);  
                res.status(400).json({ status: error.message });
                return;
            };

            console.log('################ Post cadastrado ################');
            console.log(post);
            console.log('#################################################');

            res.status(200).json(post);
        });
    } catch (error) {
        console.log(error.message);  
        res.status(400).json({ status: error.message });
    };
};

module.exports = new PostController();