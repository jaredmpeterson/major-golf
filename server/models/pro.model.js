var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var proSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    height: { type: Number },
    weight: { type: Number },
    birthday: { type: Date },
    country: { type: String },
    residence: { type: String },
    birth_place: { type: String },
    college: { type: String },
    turned_pro: { type: Number },
    updated: { type: Date }
} );

proSchema
.virtual('proInfo')
.get(function () {
  return {
    'id': this._id,
    // 'name': this.username,
    'country': this.country
  };
});

module.exports = mongoose.model("Pro", proSchema);
