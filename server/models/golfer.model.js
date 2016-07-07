var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var golferSchema = new Schema({
    first: String,
    last: String,
    country: String,
    rank: Number,
    avatar: String,
    profile: String
});

module.exports = mongoose.model("Golfer", golferSchema);
