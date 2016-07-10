var User = require('./../models/user.model.js');
var ObjectId = require('mongoose').Schema.ObjectId;

module.exports = {
  create: function(req, res, next) {
    console.log('create', req.body);
    // var user = new User(req.body) {
    //   user.save(function(err, user) {
    //     if (err) res.status(500).send(err);
    //     res.status(200).send(user);
    //   })
    // }
  },

  read: function(req, res, next) {
    console.log('read', req.body);
    User.find(req.query, function(err, user) {
      if (err) res.status(500).send(err);
      res.status(200).send(user);
    })
  },

  update: function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
      if (err) res.status(500).send(err);
      res.status(200).send(user);
    })
  },

  delete: function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
      if (err) res.status(500).send(err);
      res.status(200).send(user);
    })
  },

  show: function(req, res, next) {
    console.log('show', req.body);
    User.findOne({
      _id: req.params.id
    }, function(e, r) {
      if (e) {
        return res.status(500).send(e);
      }
      return res.status(200).json(r);
    })
  },

  me: function(req, res) {
    // console.log(req.user.userInfo);
    if (req.user) res.status(200).json(req.user.userInfo);
  }


}
