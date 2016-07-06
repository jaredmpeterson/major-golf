//Dependencies
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var TwitterStrategy = require('passport-twitter').Strategy;
var zebras = require('./zebras.js');
var mongoose = require('mongoose');

//Controllers
var userCtrl = require('./server/ctrl/user.ctrl.js');
var golferCtrl = require('./server/ctrl/golfer.ctrl.js');
var gameCtrl = require('./server/ctrl/game.ctrl.js');

// Models
var User = require('./server/models/user.model.js');
var Golfer = require('./server/models/golfer.model.js');
var Game = require('./server/models/game.model.js');

var port = 3000;
var app = express();

// App
app.use(bodyParser.json());
app.use(session({
	secret: zebras.secret,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/majorgolf', function (err, res) {
	if (err) console.log('Error connecting to database')
	else console.log('Major Golf '+ port +' reporting for duty!')
});
// mongoose.connection.once('open', function () {
// 	console.log('Major Golf reporting for duty!');
// });

passport.use(new TwitterStrategy({
	consumerKey: zebras.consumerKey,
	consumerSecret: zebras.consumerSecret,
	callbackURL: "http://127.0.0.1:" + port + "/auth/twitter/callback"
}, function (token, tokenSecret, profile, done) {
	User.findOne({
		'profile': profile.id
	}, function (err, user) {
		if (err) {
			return done(err)
		}
		if (!user) {
			user = new User({
				profile: profile.id,
				username: profile.username,
				twitter: profile
			})
			user.save(function (err) {
				if (err) console.log(err)
				return done(err, user)
			})
		} else {
			return done(err, user)
		}
	})
}))


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
	done(null, user.id);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

// Golfer Endpoints
app.get('/golfers', golferCtrl.read);
app.get('/golfers/:id', golferCtrl.show);
app.put('/golfers/:id', golferCtrl.update);
app.post('/golfers', golferCtrl.create);
app.delete('/golfers/:id', golferCtrl.delete);

// User Endpoints
app.get('/users', userCtrl.read);
app.get('/users/:id', userCtrl.show);

// Group Endpoints
app.get('/games', gameCtrl.read);
app.get('/games/:id', gameCtrl.show);
app.put('/games/:id', gameCtrl.update);
app.post('/games', gameCtrl.create);
app.delete('/games/:id', gameCtrl.delete);

app.listen(port, function () {
	// console.log("Fore " + port);
});
