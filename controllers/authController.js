const passport = require('passport');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out!');
    res.redirect('/');
}

// Middleware for permission checking
exports.isLoggedIn = (req, res, next) => {
    // Using the function in passport middle ware
    if (req.isAuthenticated()) {
        next();
        return;
    }
    //
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
}