const express = require('express');
const router = express.Router();
const fs = require('fs');
const comments = JSON.parse(fs.readFileSync('comments.json'));
router.get('/api/all', (req, res) => {
	res.send(comments); // get all comments
});
router.get('/api/:site', (req, res) => { //get comments for single site
	var s = req.params.site;
	res.send(comments[s]);
})
router.post('/api/add/', (req, res) => {
	var comment = req.body;
	var site = comments[comment.site];
	var commentObject = {
		"content": comment.content,
		"score": 0,
		"author": comment.author,
		"parent": comment.parent,
		"timestamp": comment.timestamp
	}
	site.push(commentObject);
	comments[comment.site] = site;
	fs.writeFile('comments.json', JSON.stringify(comments));
	res.end("message added");
});
module.exports = router;