var express = require('express');
var express-session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var TwitterStrategy = require('passport-twitter').Strategy;
var zebras = require('./zebras.js');

var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(session({
  secret: zebras.secret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log("Fore! " + port);
});
