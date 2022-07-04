const db = require('../models/db.js');
const User = require('../models/UserModel.js');


const logincontroller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getLogin: function (req, res) {
        res.render('login');
    },

    logOut: function (req, res) {
        req.session.destroy();
        res.render('login');
    },

    getRegister: function (req,res){
        res.render('register');
    }

}
module.exports = logincontroller;
