const mongoose = require('mongoose');
const postModel = new mongoose.Schema({

    author: {
        required: true,
        type: String
    },
    place: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    hastag: String,
    image: {
        required: true,
        type: String
    },
    like: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('postModel', postModel);