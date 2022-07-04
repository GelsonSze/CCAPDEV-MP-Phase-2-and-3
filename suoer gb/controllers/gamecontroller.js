const db = require('../models/db.js');
const GamePage= require('../models/GamePageModel.js');
const User = require('../models/UserModel.js');
const path = require('path');
const gamecontroller = {


    getIndex: function (req, res) {
        var username = req.session.username;
        if(username==null)
            res.render("login");
        else{
            db.findMany(GamePage, {}, ['name','rating','genre','description','image','reviews'], function(gamepage){
                res.render('gamebrowser',{gamepage});
            });
        }
    },

    getGamePage: function (req, res) {
        var username = req.session.username;
        if(username==null)
            res.render("login");
        else{
            var query = {name: req.params.name};

            var projection = 'name rating genre description image reviews';

            db.findOne(GamePage, query, projection, function(result){
                if(result != null) {
                    db.findOne(User, {username: req.session.username}, 'likes dislikes', function(likesdislikes){
                        var likes = likesdislikes.likes.indexOf(result.name);
                        var dislikes = likesdislikes.dislikes.indexOf(result.name);
                        if(likes >= 0 )
                            likes = true;
                        else
                            likes = false;

                        if(dislikes >= 0)
                            dislikes = true;
                        else
                            dislikes = false;

                        for(var i = 0; i<result.reviews.length; i++){
                            if(result.reviews[i].user == req.session.username){
                                result.reviews[i].commented = true;
                            }
                        }

                        var gamepage = {
                            name: result.name,
                            rating: result.rating,
                            genre: result.genre,
                            description: result.description,
                            image: result.image,
                            reviews: result.reviews,
                            likes: likes,
                            dislikes: dislikes
                        };
                        res.render('gamepage', gamepage);
                    })
                }
            });
        }
    },

    getGame: function (req, res){
        const gamename = req.query.gamename;
        db.findOne(GamePage, {name : new RegExp(`^${gamename}$`, 'i')}, ['name','rating','genre','description','image','reviews'], function(gamepage){
            res.json(gamepage);
        });
    },

    getGameGenre: function (req, res){
        const genre = req.query.genre;
        db.findMany(GamePage, {genre : {$in : new RegExp(`^${genre}$`, 'i')}}, ['name','rating','genre','description','image','reviews'], function(gamepage){
            if(gamepage!=null){
                res.json(gamepage);
            }
        });
    },

    modifyLikeDislike: function (req, res){
        const gamename = req.query.gamename;
        const like = req.query.like;
        const dislike = req.query.dislike;

        db.findOne(GamePage, {name : new RegExp(`^${gamename}$`, 'i')}, ['name','rating','genre','likes','dislikes','description','image','reviews'], function(gamepage){
            var likes = gamepage.likes;
            likes = parseInt(likes) + parseInt(like);

            var dislikes = gamepage.dislikes;
            dislikes = parseInt(dislikes) + parseInt(dislike);

            var rating = (parseFloat(likes) / (parseFloat(likes) + parseFloat(dislikes)) * 5.0).toFixed(2);
            rating = rating + '/5'

            db.updateOne(GamePage, {name : new RegExp(`^${gamename}$`, 'i')}, {'dislikes': dislikes, 'likes': likes, 'rating': rating}, function(flag){
                if(flag){
                    res.send(rating); 
                }
            });
        });
    },

    gameInput: function (req, res){
        res.render('gameinput');
    },
    
    checkGame: function(req, res) {
        var name = req.query.name;
        db.findOne(GamePage, {name: name}, '', function (result) {
            console.log(result)
            if(result!=null)
                res.send(false);    
            else
                res.send(true);
        });
    },

    addGame: function (req, res){
        var name = req.body.name;

        const nospacename = name.replace(/\s/g, ''); //removes all white spaces
        const {image} = req.files;

        var extension = image.name.split('.').pop().toUpperCase(); //splits using ., then pops the extension as upper case
        if (extension!="PNG" && extension!="JPG" && extension!="JPEG"){
            console.log("Invalid Extension");
            res.send(false);    
        }
        else{
            image.mv(path.resolve('public/images/Games',nospacename+"."+extension),function(err) {
                if(err){
                    console.log(err);
                }else{
                    console.log("sucessful upload");
                }
            });
            var genre = req.body.genre.split(',');
            var game ={
                ...req.body,
                genre: genre,
                image: '/images/Games/'+nospacename+"."+extension,
                likes:"0",
                dislikes:"0",
                rating:"No Ratings"
            }
            db.insertOne(GamePage, game, function (flag) {
                res.send(flag);    
            });
        }  
    },

    addComment: function(req, res) {
        var gamename = req.query.gamename;
        var review = req.query.review;
        db.findOne(GamePage, {name: gamename}, 'reviews', function (result) {
            result.reviews.push({"user": req.session.username, "comment": review});
            db.updateOne(GamePage, {name: gamename}, {reviews: result.reviews}, function(flag){
                res.send(flag);
            })
        });
    },

    removeComment:function(req, res) {
        var gamename = req.query.gamename;
        var review = req.query.review;
        db.findOne(GamePage, {name: gamename}, 'reviews', function (result) {
            var index = result.reviews.findIndex(obj => obj.user==req.session.username && obj.comment == review);
            result.reviews.splice(index,1);
            db.updateOne(GamePage, {name: gamename}, {reviews: result.reviews}, function(flag){
                res.send(flag);
            })
        });
    },

    editComment:function(req, res) {
        var gamename = req.query.gamename;
        var oldreview = req.query.oldreview;
        var newreview = req.query.newreview;
        db.findOne(GamePage, {name: gamename}, 'reviews', function(result){
            var index = result.reviews.findIndex(obj => obj.user==req.session.username && obj.comment == oldreview);
            result.reviews[index].comment = newreview; 
            db.updateOne(GamePage, {name: gamename}, {reviews: result.reviews}, function(flag){
                res.send(flag);
            })
        })
    }

    
}

module.exports = gamecontroller;