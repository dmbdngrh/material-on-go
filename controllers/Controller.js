const { User, Profile } = require("../models/index");
class Controller {
  static landingPage(req, res) {
    try {
      res.render("landing", { title: "Material-on-Go" });
    } catch (error) {
      res.send(error);
    }
  }

  static showLogin(req, res) {
    res.render("login", { errors: {}, email: "" });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email }, include: Profile });
      let errors = {};
      if (!email) errors.email = { message: "Please enter an email" };
      if (!password) errors.password = { message: "Please enter a password" };
      if (Object.keys(errors).length > 0) throw errors;

      if (!user || !(await user.checkPassword(password))) {
        errors.general = { message: "Invalid email or password" };
        throw errors;
      }

      req.session.user = { id: user.id, email: user.email, role: user.role, profile: !!user.Profile };
      console.log(req.session.user.profile);

      res.redirect(`/dashboard`);
    } catch (errors) {
      res.render("login", { errors, email });
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  static showRegister(req, res) {
    res.render("register", { errors: {}, email: "" });
  }

  static showProfileSetup(req, res) {
    const { continueSetup } = req.query;
    res.render("profile-setup", { errors: {}, email: "", continueSetup: !!continueSetup });
  }

  static async register(req, res) {
    const { email, password, confirmPassword } = req.body;
    try {
      const user = await User.create({ email, password, confirmPassword });
      req.session.user = { id: user.id, email: user.email, role: user.role };
      res.redirect("/");
    } catch (error) {
      let errors = {};
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        error.errors.forEach((err) => (errors[err.path] = { message: err.message }));
      }
      console.log(errors);

      res.render("register", { errors, email });
    }
  }

  static async dashboard(req, res) {
    try {
      console.log(req.session.user.role);

      const role = "partner";
      switch (req.session.user.role) {
        case "admin":
          res.render("dashboard/admin");
          break;
        case "user":
          res.render("dashboard/user");
          break;
        case "partner":
          res.render("dashboard/partner");
          break;
        default:
          throw new Error("No such role");
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async profiles(req, res) {
    try {
      console.log(req.session.user.id);

      const user = await User.findOne({
        include: Profile,
        where: {
          id: req.session.user.id,
        },
      });
      res.render("profiles", { user });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
