var mongoose = require('mongoose');

var GamePageModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    rating: String, 
    likes: String,
    dislikes: String,
    genre: {
        type: [String],
        required: true
    },
    description: String,
    image: {
        type: String,
        required: true
    },
    reviews: [{ user: {type: String, required: true},
              comment: {type: String, required: true}  }]    

});

module.exports = mongoose.model('GamePage', GamePageModelSchema);