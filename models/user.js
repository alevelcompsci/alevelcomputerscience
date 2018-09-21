var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const db = mongoose.createConnection('mongodb://localhost/users');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		default: ""
	},
	password: {
		type: String,
		default: ""
	},
	comments : {
		type:Array,
		default:[]

	},
	role: {
		type: String,
		default: ""
	},


});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hash(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = db.model("User", UserSchema, "UserData");