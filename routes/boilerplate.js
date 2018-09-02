const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		next();
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}
});
// Host static website content
router.use(express.static("/var/www/html", {
	extensions: ['html', 'htm'],
}));
router.get('/api', (req, res) => {
	if (req.url == '/api') // Info about api
	{
		res.sendFile("/var/www/info.html");
	}
});

module.exports = router;