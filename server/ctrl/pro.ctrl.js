var Pro = require('../models/pro.model');
var ObjectId = require('mongoose').Schema.ObjectId;

module.exports = {
	create: function (req, res, next) {
		console.log('create', req.body);
		Pro.create(req.body, function (err, golfer) {
			if (err) return res.status(500).send(err);
			res.status(200).json(golfer);
		})
	},

	read: function (req, res, next) {
		console.log('index', req.body);
		Pro.find(function (err, golfer) {
			if (err) res.status(500).send(err);
			res.status(200).json(golfer);
		})
	},

	show: function (req, res, next) {
    console.log('show', req.body);
		Pro.findOne({
			_id: req.params.id
		}, function (err, r) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).json(r);
		})
	},

	update: function (req, res, next) {
		console.log('update', req.body);
		delete(req.body._id);
		Pro.update({
			_id: req.params.id
		}, {
			$set: req.body
		}, function (err, golfer) {
			if (err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).json(golfer)
			}
		})
	},

	delete: function (req, res, next) {
		console.log('delete', req.body);
		Pro.remove({
			_id: req.params.id
		}, function (err, golfer) {
			if (err) {
				return res.status(500).send(err);
			}
				return res.status(200).json(golfer);
		})
	}
}
