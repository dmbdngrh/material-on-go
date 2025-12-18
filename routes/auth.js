const redirectIfAuthenticated = (req,res,next) => req.session.user ? res.redirect('/dashboard') : next();
const requireAuthentication = (req, res, next) => req.session.user ? next() : res.redirect('/');
const requireProfile = (req, res, next) => req.session.user.profile ? next() : res.redirect('/profile-setup?continueSetup=true');

module.exports = {redirectIfAuthenticated, requireAuthentication, requireProfile};