const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const GamePage = require('../models/GamePageModel.js');
const path = require('path');
const bcrypt = require("bcryptjs");
const { isNull } = require('util');

const profilecontroller = {

    getEditPage: function(req, res) {
        var username = req.session.username;
        console.log("editing user: "+username);
        if(username==null)
            res.render("login");
        else{
            db.findOne(User, {username: username}, '', function (result){ //just the first user in the database for now
                //var user = {
                //    username:"jeffcena",
                //    description:"cantseeme",
                //    email:"jc@gmail.com",
                //    password:'password123',
                //    image:'../Home_Images/mynamesjeff.jpg'
                //}
                //res.render("editprofile", user); 
                res.render("editprofile", result);
            });
        }
    },

    getProfile: function(req, res) {
        if(req.session.username==null)
            res.render("login");
        else{
            var username = req.params.username;
            if(username == req.session.username || username == null){
                username = req.session.username;
                var user  = true;
            }
            else
                var user = false;
            db.findOne(User, {username: new RegExp(`^${username}$`, 'i')}, '', function (result){ //just the first user in the database for now 
                //console.log(result)
                if(result!=null){
                    if(result.games!=""){
                        var gamesarray = [];
                        for(var i = 0 ; i< result.favorites.length; i++){
                            gamesarray.push(result.favorites[i]);
                        }
                        db.findMany(GamePage,{name: {$in: gamesarray}}, ['name','image'], function(gameimages){
                            if(gameimages != null){
                                var games = [];
                                for(var i = 0; i<result.favorites.length; i++){
                                    var index = gameimages.findIndex(obj => obj.name==result.favorites[i]);
                                    games.push({'name' : result.favorites[i] , 'image': gameimages[index].image});
                                }
                            }
                            else{
                                var favoritesboolean=false;
                            }
                            var highestindex = 0;
                            var highesthours = result.games[0].hours; //default is first game in stack
                            for (let i = 0; i < result.games.length; i++) { //loop game amount
                                if(parseInt(result.games[i].hours)>parseInt(highesthours)){
                                    highestindex = i;
                                    highesthours=result.games[i].hours;
                                }
                            }
                            var highname = result.games[highestindex].name;

                            db.findOne(GamePage, {name:highname}, '', function (x){
                                var mostplayed={
                                    name:x.name,
                                    image:x.image
                                }
                                favorite=games;
                                var profile = {
                                    username:result.username,
                                    image:result.image,
                                    description:result.description,
                                    datejoined:result.datejoined,
                                    totalgames:result.games.length,
                                    mostplayed:mostplayed,
                                    favorite:favorite,
                                    user: user
                                }
                                //console.log(mostplayed)
                                //console.log(profile);
                                res.render("profilepage", profile);
                            });     
                        })
                    }
                    else{
                        var profile = {
                            username:result.username,
                            image:result.image,
                            description:result.description,
                            datejoined:result.datejoined,
                            totalgames:result.games.length,
                            mostplayed:null,
                            favorite:null,
                            user: user
                        }

                        //console.log(profile);
                        res.render("profilepage", profile);
                    }
                }
                else{
                    console.log()
                }
            });
        }
    },

    getCheckUsername: function(req, res) {
            var username = req.query.username;
            db.findOne(User, {username: username}, '', function (result) {
                res.send(result);    
            });
    },

    getUpdateUserImg: function(req, res) {
        //var username = "pepefrog";
        var username = req.session.username;

        db.findOne(User, {username: username}, '', function (result) {
            //if()
            //const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
            const nospacename = username.replace(/\s/g, '');
            //var username = loggedin.username; probably needs unique id number
            const {image} = req.files;
    
            var extension = image.name.split('.').pop().toUpperCase(); 
            if (extension!="PNG" && extension!="JPG" && extension!="JPEG"){
                console.log("Invalid Extension");
                res.send(false);    
            }
            else{
                image.mv(path.resolve('public/images/Profile_Images',nospacename+"."+extension),function(err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("sucessful upload");
                    }
                });
                var user ={
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: '/images/Profile_Images/'+nospacename+"."+extension
                }
                db.updateOne(User, {username: username}, user, function (flag) {
                    if(flag)
                        req.session.username = username;  
                        console.log(req.session.username)  ;
                    res.send(flag);    
                });
            }
        });
    },

    getUpdateUser: function(req, res) {
        //var username = "pepefrog";
        var username = req.session.username;
        var user ={
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        db.updateOne(User, {username: username}, user, function (flag) {
            res.send(flag);    
        });
    },

    getDelete: function(req, res) {
        var username = req.session.username;
        db.deleteOne(User, {username:username}, function(flag) {
            res.send(flag);
        });
    },

    getCurrentUser:function(req, res) { //sends the username of the logged in user
        var username = req.session.username;
        //console.log("sent current user: "+username);
        res.send(username);
    },

    checkPassword: function(req, res) { //checks if logged users password is same as given password
        var username = req.session.username;
        var password = req.query.password;
        console.log("checking password of user: "+username);
        db.findOne(User, {username: username}, '', function (result) {
            const isPasswordCorrect = bcrypt.compareSync(password, result.password)
            if(isPasswordCorrect)
                console.log("wrong password entered");
            res.send(isPasswordCorrect);

        });
    },
}

module.exports = profilecontroller;