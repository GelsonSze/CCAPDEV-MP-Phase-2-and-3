var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    datejoined: {
        type: String,
        required: false
    },
    games: [
        { 
            name: {type: String, required: true},
            hours: {type: String, required: true}  
        }
    ],
    favorites: {
        type: [String]
    },
    likes: {
        type: [String]
    },
    dislikes: {
        type: [String]
    }
});

module.exports = mongoose.model('User', UserSchema);