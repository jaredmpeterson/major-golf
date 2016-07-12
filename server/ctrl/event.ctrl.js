var mongoose = require('mongoose');
var Event = require('./../models/event.model.js');
var ObjectId = require('mongoose').Schema.ObjectId;

module.exports = {
	create: function (req, res, next) {
		console.log('API create Event', req.body);
		Event.create(req.body, function (err, event) {
			if (err) res.status(500).send(err);
			res.status(200).send(event);
		})
	},

	read: function (req, res, next) {
    console.log('API read Events');
    Event.find(req.query)
			.populate('course')
			.exec(function (err, event) {
				if (err) res.status(500).send(err);
				res.status(200).send(event);
			});
		// Event.find(req.query, function(err, event) {
		//   if (err) res.status(500).send(err);
		//   res.status(200).send(event);
		// })
	},

	update: function (req, res, next) {
    console.log('API update Event');
		Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, event) {
			if (err) res.status(500).send(err);
			res.status(200).send(event);
		})
	},

	delete: function (req, res, next) {
    console.log('API delete Event');
		Event.findByIdAndRemove(req.params.id, function (err, event) {
			if (err) res.status(500).send(err);
			res.status(200).send(event);
		})
	},

	show: function (req, res, next) {
    console.log('API show Event');
		Event.findOne({
			_id: req.params.id
		})
    .populate('course')
    .exec(function (e, event) {
			if (e) res.status(500).send(e);
		  res.status(200).json(event);
		})
	}
}; // End Exports
