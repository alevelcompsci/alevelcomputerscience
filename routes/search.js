const express = require('express');
const router = express.Router();
const dirTree = require('directory-tree');

var pages = [];
var tree = dirTree("/var/www/html", {
	extensions: /\.html/
}, (item, PATH) => {
	if (!item.name.includes("embed")) {
		pages.push(item); // Add all html pages to pages array 
	}
});
router.get('/api/search/:term', (req, res) => {
	matchedTerms = [];
	var term = req.params.term;
	console.log(term);
	pages.forEach(element => {
		path = element.path;
		path = path.slice(13, path.length);
		path = path.slice(0, path.length - 5);
		var name = element.name;
		name = name.slice(0, name.length - 5);
		if (name.includes("sort")) {
			name = name.slice(0, name.length - 4) + " sort";
		}
		if (name.includes("structure")) {
			name = name.slice(0, name.length - 10) + " structures";
		}
		if (path.includes(term)) // if an element of the array matches the search term
		{
			var obj = {
				"name": name,
				"path": path
			}
			matchedTerms.push(obj); // Add object with path and name to matched terms 
		}
	});
	if (matchedTerms.length == 0) {
		matchedTerms.push({
			"name": "No matches",
			"path": "No matches"
		})
	}
	res.send(matchedTerms);
});
module.exports = router;