const mongoose      = require('mongoose');
const sharp         = require('sharp');
const path          = require('path');
const fs            = require('fs');
const postModel     = mongoose.model('postModel');

let PostController = function () {};

PostController.prototype.list = async (req, res) => {

    try {
        const posts = await postModel.find({}).sort('-createdAt');

        if(!posts) {
            console.log('################ Não foi possível listar os posts ################');
            res.status(400).json({ message: 'Não foi possível listar os posts' });
            return;
        };

        console.log('################ Posts listados ################');
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    };
};

PostController.prototype.like = async (req, res) => {

    try {
        const { id } = req.params;

        await postModel.findOne({ _id: id }, (error, post) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ message: error.message });
                return;
            };

            post.like += 1;
            post.save();

            console.log('################ Post curtido ################');
            console.log(post);
            console.log('##############################################');

            res.status(200).json(post);
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    };
};

PostController.prototype.create = async (req, res) => {

    try {
        
        const { author, place, description, hastag, like } = req.body;
        const { filename: image, destination } = req.file;
        const [name] = image.split('.');
        const newFilename = `${ name }.jpeg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(path.resolve(destination, 'resized', newFilename))

        fs.unlinkSync(req.file.path);
    
        await postModel.create({author, place, description, hastag, like, image: newFilename }, (error, post) => {

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