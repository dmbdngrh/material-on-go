const router = require("express").Router();
const Controller = require("../controllers/Controller");
const { redirectIfAuthenticated, requireAuthentication, requireProfile } = require("./auth");

router.get("/", redirectIfAuthenticated, Controller.landingPage);
router.get("/login", redirectIfAuthenticated, Controller.showLogin);
router.post("/login", Controller.login);

router.get("/register", redirectIfAuthenticated, Controller.showRegister);
router.post("/register", Controller.register);

router.use(requireAuthentication);
router.get("/profile-setup", Controller.showProfileSetup);
router.post("/profile-setup", Controller.createProfile);
router.post("/logout", Controller.logout);
router.use(requireProfile);
router.get("/dashboard", Controller.dashboard);
router.get("/profile", Controller.profile);
router.get("/profile/edit", Controller.showEditProfile);
router.post("/profile/edit", Controller.editProfile);

router.get("/user/:id/delete", Controller.deleteUser);

module.exports = router;
