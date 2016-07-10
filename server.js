//Dependencies
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var TwitterStrategy = require('passport-twitter').Strategy;
var zebras = require('./zebras.js');
var mongoose = require('mongoose');

//App
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


//Passport
app.use(session({
	secret: zebras.secret,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Controllers
var userCtrl = require('./server/ctrl/user.ctrl.js');
var golferCtrl = require('./server/ctrl/golfer.ctrl.js');
var gameCtrl = require('./server/ctrl/game.ctrl.js');

//Models
var User = require('./server/models/user.model.js');
var Golfer = require('./server/models/golfer.model.js');
var Game = require('./server/models/game.model.js');

//Variables
var port = 3000;
var mongoURI = 'mongodb://localhost/majorgolf';

//Database
mongoose.set('debug', true);
mongoose.connect(mongoURI, function (err, res) {
	if (err) console.log('Error connecting to database')
	else console.log('Major Golf '+ port +' reporting for duty!')
});
// mongoose.connection.once('open', function () {
// 	console.log('Major Golf reporting for duty!');
// });


//Middleware

passport.use(new TwitterStrategy({
	consumerKey: zebras.consumerKey,
	consumerSecret: zebras.consumerSecret,
	callbackURL: "http://127.0.0.1:" + port + "/auth/twitter/callback"
}, function (token, tokenSecret, profile, done) {
		User.findOne({
			profile: profile.id
		}, function (err, user) {
			if (err) return done(err);
			if (!user) {
				user = new User({
					profile: profile.id,
					username: profile.username,
					twitter: profile
				})
				user.save(function (err) {
					if (err) console.log(err)
					return done(null, user);
				})
			} else {
				return done(null, user);
			}
		})
}));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/#/home',
		failureRedirect: '/#/'
	})
	// ,
	// function (req, res, next) {
	// 	res.redirect('/#/home');
	// }
);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/');
});

passport.serializeUser(function (user, done) {
	console.log('serialize');
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	console.log('deserialize');
	User.findById(id, function(err, user) {
		done(null, user);
	})
});

// Golfer Endpoints
app.get('/api/golfers', golferCtrl.read);
app.get('/api/golfers/:id', golferCtrl.show);
app.put('/api/golfers/:id', golferCtrl.update);
app.post('/api/golfers', golferCtrl.create);
app.delete('/api/golfers/:id', golferCtrl.delete);

// User Endpoints
app.get('/api/users', userCtrl.read);
app.get('/api/currentuser', userCtrl.me);

// Game Endpoints
app.get('/api/games', gameCtrl.read);
app.get('/api/games/:id', gameCtrl.show);
app.put('/api/games/:id', gameCtrl.update);
app.post('/api/games', gameCtrl.create);
app.delete('/api/games/:id', gameCtrl.delete);


//Listen
app.listen(port, function () {
	// console.log("Fore " + port);
});
