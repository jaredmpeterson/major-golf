var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var courseSchema = new Schema({
    "name" : String,
    "yardage" : Number,
    "par" : Number,
    "holes" : Schema.Types.Mixed
});

module.exports = mongoose.model("Course", courseSchema);
