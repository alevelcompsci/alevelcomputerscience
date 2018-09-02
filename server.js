const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
var search = require('./routes/search');
var comment = require('./routes/comments');
var boilerplate = require('./routes/boilerplate');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(compression());
app.use('/',boilerplate);
app.use('/',search);
app.use('/',comment);

app.use(function (req, res, next) {
	console.log(req.url);
	res.status(404).sendFile("/var/www/html/not-found-page.html");
});
const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});
httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});