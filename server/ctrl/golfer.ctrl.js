var Golfers = require('../models/golfer.model');
var ObjectId = require('mongoose').Schema.ObjectId;


module.exports = {
	create: function (req, res, next) {
		Golfers.create(req.body, function (err, r) {
			if (err) {
				console.log(err)
				return res.status(500).send();
			}
			res.status(200).json(r);
		})
	},

	index: function (req, res, next) {
		Golfers.find(function (err, r) {
			if (err) {
				console.log(err)
				res.status(500).send();
			}
			res.status(200).json(r);
		})
	},

	show: function (req, res, next) {
		Golfers.findOne({
			_id: req.params.id
		}, function (err, r) {
			if (err) {
				console.log(err)
				return res.status(500).send();
			}
			return res.status(200).json(r);
		})
	},

	update: function (req, res, next) {
		delete(req.body._id);
		Golfers.update({
			_id: req.params.id
		}, {
			$set: req.body
		}, function (err, r) {
			if (err) {
				console.log(err)
				return res.status(500).send();
			} else {
				return res.status(200).json(r)
			}
		})
	},

	delete: function (req, res, next) {
		Golfers.remove({
			_id: req.params.id
		}, function (err, r) {
			if (err) {
				console.log(err)
				return res.status(500).send();
			}
			return res.status(200).json(r);
		})
	}
}
