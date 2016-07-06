var Game = require('./../models/game.model.js');
var ObjectId = require('mongoose').Schema.ObjectId;

module.exports = {
  create: function(req, res, next) {
    console.log('create', req.body);

    // var game = new Game(req.body) {
    //   game.save(function(err, game) {
    //     if (err) res.status(500).send(err);
    //     res.status(200).send(game);
    //   })
    // }
  },

  read: function(req, res, next) {
    Game.find(req.query, function(err, game) {
      if (err) res.status(500).send(err);
      res.status(200).send(game);
    })
  },

  update: function(req, res, next) {
    Game.findByIdAndUpdate(req.params.id, req.body, function(err, game) {
      if (err) res.status(500).send(err);
      res.status(200).send(game);
    })
  },

  delete: function(req, res, next) {
    Game.findByIdAndRemove(req.params.id, function(err, game) {
      if (err) res.status(500).send(err);
      res.status(200).send(game);
    })
  },

  show: function(req, res, next) {
    Game.findOne({
      gamename: req.params.id
    }, function(e, r) {
      if (e) {
        return res.status(500).send(e);
      }
      return res.status(200).json(r);
    })
  }
}
