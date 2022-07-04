const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require("bcryptjs");

const usercontroller={

    // user registration
    registerUser: function(reqBody)  {
        let newUser = new User({
            username: reqBody.username,
            email: reqBody.email,
            password: bcrypt.hashSync(reqBody.password, 10),
            image: reqBody.images
        })
        return newUser.save().then((saved, error) => {
            if(error){
                console.log(error)
                return false
            }else{
                return true
            }
        })
    },

    // user login
    userLogin: function(req,res) {
        return User.findOne({username: req.body.username}).then(result => {
            if(result !=null){
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)
                if(isPasswordCorrect) {
                    req.session.username = req.body.username;
                    return result.toObject()
                }else{
                    return false  
                }
            }else{
                return false
            }
        })
    },

    userCheck: function(reqBody) {
        var username = reqBody.username;
        return User.findOne({ username : new RegExp(`^${username}$`, 'i') }).then(result => {
            if(result!=null) {
                return reqBody.username;
            } else {
                return null;
            }
        });
    }
}

module.exports = usercontroller;
