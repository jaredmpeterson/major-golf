var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    profile: String,
    username: String,
    twitter: Schema.Types.Mixed
});

module.exports = mongoose.model("User", userSchema);
