const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

function contains(a, obj) {
	var i = a.length;
	while (i--) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}
router.post('/account/signup', (req, res) => {

	if (req.body.username.length < 4) {
		return res.json({
			success: false,
			message: "Username needs to be more than 4 characters"
		})
	}

	if (req.body.password.length < 4) {
		return res.json({
			success: false,
			message: "Password needs to be more than 4 characters"
		})
	}

	User.find({
		username: req.body.username
	}, function (err, users) {
		if (err) {
			return res.send({
				success: false,
				message: "Server Error"
			});
		}
		if (users.length != 0) {
			return res.send({
				success: false,
				message: "Account already exists"
			});
		}
		const newUser = new User();
		newUser.username = req.body.username;
		newUser.password = newUser.generateHash(req.body.password);
		newUser.role = "default";
		newUser.save((err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: "Server Error"
				});
			}
			return res.send({
				success: true,
				message: "Signed up"
			});
		});
	});
});

router.post('/account/signin/', (req, res) => {
	const {
		username,
		password
	} = req.body

	User.find({
		username: username,
	}, function (err, users) {
		if (err) {
			return res.json({
				success: false,
				message: "Server Error"
			})
		}
		if (users.length != 1) {
			return res.json({
				success: false,
				message: "Invalid"
			});
		}
		const user = users[0];
		if (user.validPassword(password)) {
			req.session.user = user;

			req.session.loggedIn = true
			return res.json({
				success: true,
				message: "Credentials correct"
			});
		} else {
			req.session.loggedIn = false;
			return res.json({
				success: false,
				message: "Invalid credentials"
			});
		}


	})

});


router.get('/dashboard', (req, res) => {
	if (req.session.loggedIn) {
		res.sendFile('/var/www/admin.html');
	} else {
		return res.sendFile("/var/www/info.html");
	}
});

router.get('/name', (req, res) => {
	if (req.session.loggedIn) {
		return res.json({
			success: true,
			message: "Hello " + req.session.user.username
		});
	}
	return res.json({
		success: false,
		message: "Error not logged in"
	});
});
router.get('/logout', (req, res) => {
	req.session.loggedIn = false;
	req.session.user = null;
	res.send({
		success: true,
		message: "Logged out"
	})
});

router.post('/post', (req, res) => {
		const {
			body
		} = req;
		const {
			loggedIn,
			user
		} = req.session;
		if (!loggedIn) {
			return res.json({
				success: false,
				message: "Login in to post a message."
			});
		}
		var comment = new Post();
		comment.author = user.username;
		comment.content = body.content;
		if (body.page == "/") {
			comment.page = "index";
		} else {
			comment.page = body.page;
		}

		comment.save((err, comment) => {
			if (err) {
				return res.json({
					success: false,
					message: "Server Error"
				})
			}
			User.findOneAndUpdate({
				_id: user._id
			}, {
				$push: {
					comments: comment._id
				}
			}, {
				new: true
			}, (err, users) => {
				if (err) {
					return res.json({
						success: false,
						message: "Server Error"
					})
				}
			});
		});


	}

);

router.get('/posts/:page', (req, res) => {
	var this_page = req.params.page;
	const {
		user,
		loggedIn
	} = req.session;
	Post.find({
		page: this_page
	}, (err, posts) => {
		if (err) {
			return res.json({
				success: false,
				message: "Server Error"
			})
		}
		if (loggedIn) {

			return res.json({
				success: true,
				message: posts.map(element => {
					element = element.toObject();
					if (contains(element.upvotes, user._id)) {
						element.vote = 1

					} else if (contains(element.downvotes, user._id)) {
						element.vote = -1

					} else {
						element.vote = 0;

					}
					return element;
				})
			});
		}
		return res.json({
			success: true,
			message: posts
		});
	});
});
router.get('/posts/latest/:page', (req, res) => {
	Post.find({
		page: req.params.page
	}, (err, posts) => {
		if (err) {
			return res.json({
				success: false,
				message: "Server Error"
			})
		}
		const latestPost = posts[posts.length - 1];
		if (posts.length == 0) {
			return res.json({
				success: false,
				message: "No comments"
			});
		}
		return res.json({
			success: true,
			message: latestPost
		});
	});
});

router.get('/post/score/:id',(req,res) =>
{
	const { user , loggedIn } = req.session;
	const { id } = req.params;
	if(!loggedIn)
	{
	return res.json({
				success: false,
				message: "User not logged in"
			});
	}
	Post.find({_id : id},(err,posts) =>
	{
		var vote;
		if(contains(posts[0].upvotes,user._id))
		{
			vote = 1;
		}
		else if(contains(posts[0].downvotes,user._id))
		{
			vote = -1;
		}
		else
		{
			vote = 0;
		}
		return res.json({
				success: true,
				score:posts[0].score,
				vote :vote
			});
	});
});
router.post('/upvote', (req, res) => {
	const {
		user,
		loggedIn
	} = req.session;
	const {
		body
	} = req;

	if (!loggedIn) {
		return res.send({
			success: false,
			message: "User not logged in"
		});
	}

	Post.find({
		_id: body._id
	}, (err, posts) => {
		if (err) {
			return res.json({
				success: false,
				message: "Server Error"
			})
		}
		if (posts.length != 1) {
			return res.json({
				success: false,
				message: "Invalid post"
			});
		};
		var [post] = posts;
		if (contains(post.upvotes, user._id)) {
			return res.json({
				success: false,
				message: "Already upvoted"
			});
		} else if (contains(post.downvotes, user._id)) {
			post.downvotes = post.downvotes.filter(e => e !== user._id);
			post.score = post.score + 2;
			post.upvotes.push(user._id);
			post.save((err, post) => {
				if (err) {
					return res.json({
						success: false,
						message: "Server Error"
					})
				}
			});
		} else {
			post.score = post.score + 1;
			post.upvotes.push(user._id);
			post.save((err, post) => {
				if (err) {
					return res.json({
						success: false,
						message: "Server Error"
					})
				}
				return res.json({
					success: true,
					message: "Upvoted"
				});
			});

		}
	});
});

router.post('/downvote', (req, res) => {
	const {
		user,
		loggedIn
	} = req.session;
	const {
		body
	} = req;

	if (!loggedIn) {
		return res.send({
			success: false,
			message: "User not logged in"
		});
	}

	Post.find({
		_id: body._id
	}, (err, posts) => {
		if (err) {
			return res.json({
				success: false,
				message: "Server Error"
			})
		}
		if (posts.length != 1) {
			return res.json({
				success: false,
				message: "Invalid post"
			});
		};
		var [post] = posts;
		if (contains(post.downvotes, user._id)) {
			console.log(post.downvotes);
			return res.json({
				success: false,
				message: "Already downvoted"
			});
		} else if (contains(post.upvotes, user._id)) {
			post.upvotes = post.upvotes.filter(e => e !== user._id);
			post.score = post.score - 2;
			post.downvotes.push(user._id);
			post.save((err, post) => {
				if (err) {
					return res.json({
						success: false,
						message: "Server Error"
					})
				}
			});
		} else {
			post.score = post.score - 1;
			post.downvotes.push(user._id);
			post.save((err, post) => {
				if (err) {
					return res.json({
						success: false,
						message: "Server Error"
					})
				}
				return res.json({
					success: true,
					message: "Downvoted"
				});
			});

		}
	});
});
module.exports = router;
