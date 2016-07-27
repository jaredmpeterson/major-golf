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
var proCtrl = require('./server/ctrl/pro.ctrl.js');
var eventCtrl = require('./server/ctrl/event.ctrl.js');
var courseCtrl = require('./server/ctrl/course.ctrl.js');

//Models
var User = require('./server/models/user.model.js');
var Golfer = require('./server/models/golfer.model.js');
var Game = require('./server/models/game.model.js');
var Pro = require('./server/models/pro.model.js');
var Event = require('./server/models/event.model.js');
var Course = require('./server/models/course.model.js');

//Variables
var port = 3000;


//Database
mongoose.set('debug', true);
mongoose.connect(zebras.mongoURI, function (err, res) {
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

// Pro Endpoints
app.get('/api/pro', proCtrl.read);
app.get('/api/pro/:id', proCtrl.show);
app.put('/api/pro/:id', proCtrl.update);
app.post('/api/pro', proCtrl.create);
app.delete('/api/pro/:id', proCtrl.delete);

// User Endpoints
app.get('/api/users', userCtrl.read);
app.get('/api/currentuser', userCtrl.me);

// Game Endpoints
app.get('/api/games', gameCtrl.read);
app.get('/api/games/:id', gameCtrl.show);
app.put('/api/games/:id', gameCtrl.update);
app.post('/api/games', gameCtrl.create);
app.delete('/api/games/:id', gameCtrl.delete);

// Event Endpoints
app.get('/api/event', eventCtrl.read);
app.get('/api/event/:id', eventCtrl.show);
app.put('/api/event/:id', eventCtrl.update);
app.post('/api/event', eventCtrl.create);
app.delete('/api/event/:id', eventCtrl.delete);

// Event Endpoints
app.get('/api/course', courseCtrl.read);
app.get('/api/course/:id', courseCtrl.show);
app.put('/api/course/:id', courseCtrl.update);
app.post('/api/course', courseCtrl.create);
app.delete('/api/course/:id', courseCtrl.delete);

//Listen
app.listen(port, function () {
	// console.log("Fore " + port);
});
