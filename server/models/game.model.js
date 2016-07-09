var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user.model.js');
var Golfer = require('./golfer.model.js');

var gameSchema = new Schema({
  _creator : { type: String, ref: 'User' },
  _created: { type: Date, default: Date.now },
  name: String,
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("Game", gameSchema);
