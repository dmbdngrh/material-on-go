const router = require('express').Router();
const Controller = require('../controllers/Controller');
const { redirectIfAuthenticated, requireAuthentication, requireProfile } = require('./auth');

router.get('/', redirectIfAuthenticated, Controller.landingPage);
router.get('/login', redirectIfAuthenticated, Controller.showLogin);
router.post('/login', Controller.login);

router.get('/register', redirectIfAuthenticated, Controller.showRegister);
router.post('/register', Controller.register);

router.use(requireAuthentication);
router.get('/profile-setup', Controller.showProfileSetup);

router.use(requireProfile);
router.post('/logout', Controller.logout);
router.get('/dashboard', Controller.dashboard);
router.get('/profiles', Controller.profiles);

module.exports = router;