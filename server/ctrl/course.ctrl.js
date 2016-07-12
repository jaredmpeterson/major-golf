var mongoose = require('mongoose');
var Course = require('./../models/course.model.js');
var ObjectId = require('mongoose').Schema.ObjectId;

module.exports = {
	create: function (req, res, next) {
		console.log('API create Course', req.body);
		Course.create(req.body, function (err, course) {
			if (err) res.status(500).send(err);
			res.status(200).send(course);
		})
	},

	read: function (req, res, next) {
    console.log('API read Courses');
    Course.find(req.query)
			.exec(function (err, course) {
				if (err) res.status(500).send(err);
				res.status(200).send(course);
			});
		// Course.find(req.query, function(err, course) {
		//   if (err) res.status(500).send(err);
		//   res.status(200).send(course);
		// })
	},

	update: function (req, res, next) {
    console.log('API update Course');
		Course.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, course) {
			if (err) res.status(500).send(err);
			res.status(200).send(course);
		})
	},

	delete: function (req, res, next) {
    console.log('API delete Course');
		Course.findByIdAndRemove(req.params.id, function (err, course) {
			if (err) res.status(500).send(err);
			res.status(200).send(course);
		})
	},

	show: function (req, res, next) {
    console.log('API show Course');
		Course.findOne({
			_id: req.params.id
		})
    .exec(function (e, course) {
			if (e) res.status(500).send(e);
		  res.status(200).json(course);
		})
	}
}; // End Exports
