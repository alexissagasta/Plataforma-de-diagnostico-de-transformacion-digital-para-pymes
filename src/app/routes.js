module.exports = (app, passport) => {
	
	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});

	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	//historial view
	app.get('/historial', isLoggedIn, (req, res) => {
		res.render('historial', {
			user: req.user
		});

	});

	//configuracion view
	app.get('/configuracion', isLoggedIn, (req, res) => {
		res.render('configuracion', {
			user: req.user
		});

	});

	
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
