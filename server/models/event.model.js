var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user.model.js');

var eventSchema = new Schema({
  name: String,
  date: Date,
  golfers: [
    { name: Schema.Types.ObjectId, ref: 'Golfer',
      R1: Number,
      R2: Number,
      R3: Number,
      R4: Number
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
