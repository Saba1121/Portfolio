let mongoose = require('mongoose');

let postsSchema = new mongoose.Schema({
    text : {
        type : String,
        min: 1
    },

    author: {
        type : mongoose.Schema.Types.ObjectId,
        min: 6,
        ref : 'User'
    },

    time : {
        type : Date,
        default : new Date
    }
})

module.exports = mongoose.model('Post', postsSchema);