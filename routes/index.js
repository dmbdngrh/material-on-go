const router = require('express').Router();
const Controller = require('../controllers/Controller');

router.get('/', 
    (req,res,next) => req.session.user ? res.redirect('/dashboard') : next(),
    Controller.landingPage);
router.get('/login', Controller.showLogin);
router.post('/login', Controller.login);
router.get('/register', Controller.showRegister);
router.post('/register', Controller.register);
router.use((req, res, next) => req.session.user ? next() : res.redirect('/'));
router.post('/logout', Controller.logout);
router.get('/dashboard', Controller.dashboard);

module.exports = router;