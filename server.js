const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const comments = JSON.parse(fs.readFileSync('comments.json'));
const compression = require('compression');
const dirTree = require('directory-tree');
const app = express();
var pages = [];
var tree = dirTree(__dirname + "/html", {
	extensions: /\.html/
}, (item, PATH) => {
	if (!item.name.includes("embed") && !item.name.includes("google")) {
		pages.push(item); // Add all html pages to pages array 
	}
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(compression());
app.use(function (req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		next();
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}
});
// Host static website content
app.use(express.static(__dirname + "/html", {
	extensions: ['html', 'htm'],
}));
app.get('/api', (req, res) => {
	if (req.url == '/api') // Info about api
	{
		res.sendFile(__dirname + '/info.html');
	}
});
app.get('/api/search/:term', (req, res) => {
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
			name = name.slice(0, name.length - 9) + " structure";
		}
		if (name.includes(term)) // if an element of the array matches the search term
		{
			var obj = {
				"name": name,
				"path": path
			}
			matchedTerms.push(obj); // Add object with path and name to matched terms 
		}
	});
	res.send(matchedTerms);

});
app.get('/api/all', (req, res) => {
	res.send(comments); // get all comments
});

app.get('/api/:site', (req, res) => { //get comments for single site
	var s = req.params.site;
	res.send(comments[s]);
})

app.post('/api/add/', (req, res) => {
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
});

app.use(function (req, res, next) {
	res.status(404).sendFile('not-found-page.html', {
		root: __dirname + "/html"
	});
});

// Certificate
const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});