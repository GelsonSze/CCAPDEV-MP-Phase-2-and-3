const express = require('express');

const gamecontroller = require('../controllers/gamecontroller.js');
const librarycontroller = require('../controllers/librarycontroller.js');
const logincontroller = require('../controllers/logincontroller.js');
const profilecontroller = require('../controllers/profilecontroller.js');

const app = express();
app.get('/favicon.ico', logincontroller.getFavicon);
app.get('/', logincontroller.getLogin);
app.get('/logOut', logincontroller.logOut);


app.get('/register', logincontroller.getRegister);


//profile controllers
app.get(`/editprofile`, profilecontroller.getEditPage);
app.get(`/profile`, profilecontroller.getProfile);
app.get(`/profile/:username`, profilecontroller.getProfile);
app.get(`/delete`, profilecontroller.getDelete);
app.get(`/getCheckUsername`, profilecontroller.getCheckUsername);
app.get(`/getUpdateUser`, profilecontroller.getUpdateUser);
app.get(`/checkPassword`, profilecontroller.checkPassword);
app.get(`/getCurrentUser`, profilecontroller.getCurrentUser);
app.post(`/getCheckUsername`, profilecontroller.getCheckUsername);
app.post(`/getUpdateUser`, profilecontroller.getUpdateUser);
app.post(`/getUpdateUserImg`, profilecontroller.getUpdateUserImg);

//game controllers
app.get('/browse', gamecontroller.getIndex);
app.get('/gamepage/:name', gamecontroller.getGamePage);
app.get('/findgame', gamecontroller.getGame);
app.get('/findgenre', gamecontroller.getGameGenre);
app.get('/modifylikedislike', gamecontroller.modifyLikeDislike);
app.get('/gameinput', gamecontroller.gameInput);
app.get('/checkGame', gamecontroller.checkGame);
app.get('/postcomment', gamecontroller.addComment);
app.get('/removecomment', gamecontroller.removeComment);
app.get('/editcomment', gamecontroller.editComment);
app.post('/addGame', gamecontroller.addGame);

//library controllers
app.get('/library', librarycontroller.getLibrary);
app.get('/library/:username', librarycontroller.getLibrary);
app.get('/libraryaddgame', librarycontroller.addGameLibrary);
app.get('/libraryfindgame', librarycontroller.findGameLibrary);
app.get('/libraryfavoritegame', librarycontroller.addFavoriteGame);
app.get('/libraryremovefavoritegame', librarycontroller.removeFavoriteGame);
app.get('/libraryremovegame', librarycontroller.removeGameLibrary);
app.get('/modifylikedgames', librarycontroller.modifyLikedGames);
app.get('/modifydislikedgames', librarycontroller.modifyDisLikedGames);

module.exports = app;