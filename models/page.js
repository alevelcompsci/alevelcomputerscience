var mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/pages');

var PageSchema = new mongoose.Schema({
	title: {
		type : String,
		default : ""
	},
	title_text: {
		type: String,
		default : ""
	},
	summary: {
		type: String,
		default : ""
	},
	program: {
		type : String,
		default : ""
	},
	body: {
		type: String,
		default : ""
	},
	
});

module.exports = db.model("Page",PageSchema,"PageData");
