//Dependencies
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var TwitterStrategy = require('passport-twitter').Strategy;
var zebras = require('./zebras.js');
var mongoose = require('mongoose');

//Controllers
// var userCtrl = require('./server/ctrl/user.ctrl.js');

var port = 3000;
var app = express();


var User = require('./server/models/user.model.js');

app.use(bodyParser.json());
app.use(session({
	secret: zebras.secret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/majorgolf');
mongoose.connection.once('open', function () {
	console.log('Major Golf reporting for duty!');
});

passport.use(new TwitterStrategy({
		consumerKey: zebras.consumerKey,
		consumerSecret: zebras.consumerSecret,
		callbackURL: "http://127.0.0.1:" + port + "/auth/twitter/callback"
	},
	function (token, tokenSecret, profile, cb) {
		User.create({
			twitterId: profile.id
		}, function (err, user) {

			return cb(null, user);
		});
	}
));



app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/#/home',
		failureRedirect: '/',
		failureFlash: true
	}),
	function (req, res, next) {
		res.redirect('/#/home');
		console.log("hmm");
	}
);

passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

app.listen(port, function () {
	console.log("Fore! " + port);
});
