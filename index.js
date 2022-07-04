var PORT = process.env.PORT || 3000;

require('dotenv').config();
const express = require(`express`);
const bodyParser = require(`body-parser`);
const hbs = require(`hbs`);
const db = require(`./models/db.js`);
const app = express();
const session = require('express-session');
const Mongostore = require('connect-mongo');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + `/views/partials`);

const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

const routes = require(`./routes/routes.js`);
const routes2 = require("./routes/userRoutes.js");

let store = new Mongostore({
  mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ccapdev-mp2',
  collection: "sessions"
})

app.use(session({
  secret: "CCAPDEVMP",
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(express.static(__dirname + `/public`));
app.use(`/`, routes);
app.use("/api/users", routes2);
db.connect();

app.listen(PORT, '0.0.0.0' , function () {
    console.log(`Server is running at:`);
    console.log(`http://` + 'localhost' + `:` + PORT);
});


