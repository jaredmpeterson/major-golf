var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Course= require('./course.model.js');

var eventSchema = new Schema({
    "name" : String,
    "start_date" : Date,
    "end_date" : Date,
    "venue" : String,
    "city" : String,
    "country" : String,
    "course" : {type: Schema.Types.ObjectId, ref:'Course'}
});

module.exports = mongoose.model("Event", eventSchema);
