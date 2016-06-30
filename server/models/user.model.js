var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    twitter_id: Number,
    name: String,
    screen_name: String,
    description: String,
    url: String
});

module.exports = mongoose.model("User", userSchema);
