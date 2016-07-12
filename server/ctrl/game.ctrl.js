var mongoose = require('mongoose');
var Game = require('./../models/game.model.js');
var ObjectId = require('mongoose').Schema.ObjectId;

module.exports = {
	create: function (req, res, next) {
		console.log('API create Game', req.body);
		Game.create(req.body, function (err, game) {
			if (err) res.status(500).send(err);
			res.status(200).send(game);
		})
	},

	read: function (req, res, next) {
    console.log('API read Games');
    Game.find(req.query)
			.populate('creator', "username")
			.populate('event', "name")
      .populate('players', "username")
			.exec(function (err, game) {
				if (err) res.status(500).send(err);
				res.status(200).send(game);
			});
		// Game.find(req.query, function(err, game) {
		//   if (err) res.status(500).send(err);
		//   res.status(200).send(game);
		// })
	},

	update: function (req, res, next) {
    console.log('API update Game');
		Game.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, game) {
			if (err) res.status(500).send(err);
			res.status(200).send(game);
		})
	},

	delete: function (req, res, next) {
    console.log('API delete Game');
		Game.findByIdAndRemove(req.params.id, function (err, game) {
			if (err) res.status(500).send(err);
			res.status(200).send(game);
		})
	},

	show: function (req, res, next) {
    console.log('API show Game');
		Game.findOne({
			_id: req.params.id
		})
    .populate('creator', "username")
		.populate('event', "name")
    .populate('players', "username")
    .exec(function (e, game) {
			if (e) res.status(500).send(e);
		  res.status(200).json(game);
		})
	}
}; // End Exports
