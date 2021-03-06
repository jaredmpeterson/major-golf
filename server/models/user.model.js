var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
			profile: String,
			username: {
				type: String,
				index: true
			},
			created: {
				type: Date,
				default: new Date()
			},
			admin: {
				type: Boolean,
				default: false
			},
			twitter: Schema.Types.Mixed
    // }, {
  	// 		toObject: {
  	// 			virtuals: true
  	// 		},
  	// 		toJSON: {
  	// 			virtuals: true
  	// 		}
  		});

userSchema.plugin(timestamps);

		// Basic info to identify the current authenticated user in the app
		userSchema
		.virtual('userInfo')
		.get(function () {
			return {
				'id': this._id,
				'username': this.username,
				'admin': this.admin,
				'profileImg': this.twitter._json.profile_image_url,
				'url': this.twitter.url,
				'profile': this.twitter
			};
		});

		// Public profile information
		userSchema
		.virtual('public')
		.get(function () {
			return {
				'name': this.twitter.displayName,
				'username': this.username,
				'profileImg': this.twitter._json.profile_image_url,
			};
		});

		module.exports = mongoose.model("User", userSchema);
