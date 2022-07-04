const db = require('../models/db.js');
const GamePage= require('../models/GamePageModel.js');
const User = require('../models/UserModel.js');
const librarycontroller = {

    getLibrary: function (req, res) {
        var username = req.session.username;
        if(username==null)
            res.render("login");
        else{
            var username = req.params.username;
            
            db.findOne(User, {username: username}, 'games', function(gameslist){
                if(gameslist!=null){
                    if(username == req.session.username)
                        var user = true;
                    else
                        var user = false;

                    var gamesarray = [];
                    for(var i = 0 ; i< gameslist.games.length; i++){
                        gamesarray.push(gameslist.games[i].name);
                    }
                    db.findMany(GamePage,{name: {$in: gamesarray}}, ['name','image'], function(gameimages){
                        if(gameimages != null){
                            var games = [];
                            for(var i = 0; i<gameslist.games.length; i++){
                                var index = gameimages.findIndex(obj => obj.name==gameslist.games[i].name);

                                games.push({'name' : gameslist.games[i].name , 'hours': gameslist.games[i].hours, 'image': gameimages[index].image, 'user': user});
                            }
                            
                            res.render('library',{games});
                        }
                    })
                }
            });
        }
    },

    addGameLibrary: function (req, res) {
        
        var gamename = req.query.gamename;
        var hours = req.query.hours;

        db.findOne(User, {username: req.session.username}, 'games', function(gameslist){
            var flag = true;
            for(var i = 0 ;i <gameslist.games.length; i++){
                if(gameslist.games[i].name == gamename){
                    flag = false;
                    break;
                }
            }
            if(flag){
                var game = {
                    name: gamename,
                    hours: hours
                }
                gameslist.games.push(game);
                db.updateOne(User, {username: req.session.username}, {games: gameslist.games},function(flag){
                    res.send(flag);
                })
            }
            else{
                res.send(flag);
            }
        });
    },

    addFavoriteGame: function (req, res) {
        var gamename = req.query.gamename;
        db.findOne(User, {username: req.session.username}, 'favorites', function(favoriteslist){
            var flag = true;
            for(var i = 0 ;i <favoriteslist.favorites.length; i++){
                if(favoriteslist.favorites[i] == gamename){
                    flag = false;
                    break;
                }
            }
            if(flag){    
                favoriteslist.favorites.push(gamename);
                db.updateOne(User, {username: req.session.username}, {favorites: favoriteslist.favorites},function(flag){
                    res.send(flag);
                })
            }
            else
                res.send(false);
        })
    },

    removeFavoriteGame: function (req, res) {
        var gamename = req.query.gamename;
        db.findOne(User, {username: req.session.username}, 'favorites', function(favoriteslist){
            var index = favoriteslist.favorites.indexOf(gamename);
            if(index >= 0){
                favoriteslist.favorites.splice(index,1);
                db.updateOne(User, {username: req.session.username}, {favorites: favoriteslist.favorites},function(flag){
                    res.send(flag);
                })
            }
        })
    },

    removeGameLibrary: function (req, res){
        var gamename = req.query.gamename;
        db.findOne(User, {username: req.session.username}, 'games', function(gameslist){
            var index = gameslist.games.findIndex(obj => obj.name==gamename);
            gameslist.games.splice(index,1);
            db.updateOne(User, {username: req.session.username}, {games: gameslist.games},function(flag){
                res.send(flag);
            })
        })
    },

    findGameLibrary: function (req, res){
        var gamename = req.query.gamename;
        var projection = 'games';
        db.findOne(User, {username: req.session.username}, projection, function(gameslist){
            if(gameslist != null){
                var index = gameslist.games.findIndex(obj => obj.name.toLowerCase()==gamename.toLowerCase());

                if(index >= 0 ){
                    db.findOne(GamePage, {name: {$in : new RegExp(`^${gamename}$`, 'i')}}, ['name','image'],function(gameimage){
                        var gamepage = {
                            name: gameimage.name,
                            image: gameimage.image,
                            hours: gameslist.games[index].hours
                        }
                        res.json(gamepage);
                    })
                }
                else
                    res.json(null);
            }
        })
    },

    modifyLikedGames: function (req, res){
        var gamename = req.query.gamename;
        var like = req.query.like;

        if(like == "1"){
            db.findOne(User, {username: req.session.username}, 'likes', function(likedgames){
                likedgames.likes.push(gamename);
                db.updateOne(User, {username: req.session.username}, {likes : likedgames.likes}, function(flag){
                    res.send(flag);
                })
            })  
        }
        if(like == "-1"){
            db.findOne(User, {username: req.session.username}, 'likes', function(likedgames){
                var index = likedgames.likes.indexOf(gamename);
                likedgames.likes.splice(index,1);
                db.updateOne(User, {username: req.session.username}, {likes: likedgames.likes}, function(flag){
                    res.send(flag);
                })
            })
        }
    },
    modifyDisLikedGames: function (req, res){
        var gamename = req.query.gamename;
        var dislike = req.query.dislike;  

        if(dislike == "1"){
            db.findOne(User, {username: req.session.username}, 'dislikes', function(dislikedgames){
                dislikedgames.dislikes.push(gamename);
                db.updateOne(User, {username: req.session.username}, {dislikes : dislikedgames.dislikes}, function(flag){
                    res.send(flag);
                })
            })
        }
        if(dislike == "-1"){
            db.findOne(User, {username: req.session.username}, 'dislikes', function(dislikedgames){
                var index = dislikedgames.dislikes.indexOf(gamename);
                dislikedgames.dislikes.splice(index,1);
                db.updateOne(User, {username: req.session.username}, {dislikes: dislikedgames.dislikes}, function(flag){
                    res.send(flag);
                })
            })
        }
    },

}

module.exports = librarycontroller;