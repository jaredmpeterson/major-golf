var express = require('express');
var express - session = require('express-session');
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
passport.use(new TwitterStrategy({
		consumerKey: zebras.consumerKey,
		consumerSecret: zebras.consumerSecret,
		callbackURL: "http://127.0.0.1:" + port + "/auth/twitter/callback"
	},
	function (token, tokenSecret, profile, cb) {
		User.findOrCreate({
			twitterId: profile.id
		}, function (err, user) {
			return cb(err, user);
		});
	}
));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/#/home',
		failureRedirect: '/login'
	}),
	funtion(req, res) {
		res.redirect('/');
	});

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

app.listen(port, function () {
	console.log("Fore! " + port);
});
