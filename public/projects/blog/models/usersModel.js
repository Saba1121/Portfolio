let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    username : {
        type: String,
        min: 6
    },
    email : {
        type: String,
        min: 6
    }, 
    password : {
        type: String,
        min: 6
    }
});

let Users = mongoose.model('User', usersSchema); 

module.exports = Users;