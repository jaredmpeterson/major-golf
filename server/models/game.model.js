var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var User = require('./user.model.js');
// var Golfer = require('./golfer.model.js');

// Game Schema
var gameSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref:'User'},
  event: {type: Schema.Types.ObjectId, ref:'Event'},
  created: { type: Date, default: new Date() },
  name: String,
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Game', gameSchema);
