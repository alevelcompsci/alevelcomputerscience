const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const search = require('./routes/search');
const boilerplate = require('./routes/boilerplate');
// const accounts = require('./routes/accounts');
const app = express();
app.use(session({
	secret:"yeet" ,
	resave: false,
	saveUninitialized: true,
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(compression());
app.use('/', boilerplate);
app.use('/', search);
//app.use('/', accounts);

module.exports = app;
