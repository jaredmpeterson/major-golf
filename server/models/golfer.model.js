var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var golferSchema = new Schema({
    First: String,
    Last: String,
    Country: String,
    Rank: Number
});

module.exports = mongoose.model("Golfer", golferSchema);
