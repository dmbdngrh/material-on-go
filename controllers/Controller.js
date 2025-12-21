const { calculateAge, formatIDR } = require("../helper/helper");
const { User, Profile, Store, Order, Item, OrderItem } = require("../models/index");
const {Op} = require('sequelize');
class Controller {
  static landingPage(req, res) {
    try {
      res.render("landing", { title: "Material-on-Go", user: req.session.user });
    } catch (error) {
      res.send(error);
    }
  }

  static showLogin(req, res) {
    res.render("login", { errors: {}, email: "", user: req.session.user });
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
      if (user.Profile) {
        req.session.user.name = user.Profile.firstName;
        req.session.user.profilePicture = user.Profile.profilePicture;
      }
      console.log(req.session.user.profile);

      res.redirect(`/dashboard`);
    } catch (errors) {
      res.render("login", { errors, email, user: req.session.user });
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
    res.render("register", { errors: {}, email: "", user: req.session.user });
  }

  static async register(req, res) {
    const { email, password, confirmPassword } = req.body;
    try {
      const user = await User.create({ email, password, confirmPassword });
      req.session.user = { id: user.id, email: user.email, role: user.role };
      res.redirect("/profile-setup");
    } catch (error) {
      let errors = {};
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        error.errors.forEach((err) => (errors[err.path] = { message: err.message }));
      }
      console.log(errors);

      res.render("register", { errors, email, user: req.session.user });
    }
  }

  static showProfileSetup(req, res) {
    const { continueSetup } = req.query;
    res.render("profile-setup", { errors: {}, email: "", continueSetup: !!continueSetup, user: req.session.user });
  }

  static async createProfile(req, res) {
    let { firstName, lastName, gender, dateOfBirth, profilePicture, phoneNumber, address } = req.body;
    try {
      if(profilePicture === '') profilePicture = undefined;
      const user = await Profile.create({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        profilePicture,
        phoneNumber,
        address,
        UserId: req.session.user.id,
      });

      req.session.user.profile = !!user;
      req.session.user.name = user.firstName;
      req.session.user.profilePicture = user.profilePicture;
      res.redirect("/dashboard");
    } catch (error) {
      let errors = {};
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        error.errors.forEach((err) => (errors[err.path] = { message: err.message }));
      }
      console.log(errors);

      res.render("profile-setup", { errors, user: req.session.user });
    }
  }

  static async dashboard(req, res) {
    try {
      console.log(req.session.user.role);

      switch (req.session.user.role) {
        case "admin":
          const {deleted, search} = req.query;
          const option = {include: Profile}
          if(search) {
            option.where = {
              [Op.or]: [
                {
                  '$Profile.firstName$': {
                    [Op.iLike]: `%${search}%`
                  }
                },
                {
                  '$Profile.lastName$': {
                    [Op.iLike]: `%${search}%`
                  }
                }
              ]
            };
          }
          const data = await User.findAll(option);
          
          res.render("dashboard/admin", { data, deleted, user: req.session.user });
          break;
        case "user":
          const ongoingOrder = await Order.findOne({
            where: {
              UserId: req.session.user.id,
              status: 'ongoing'
            },
            include: [
              {
                model: Item,
                through: {
                  attributes: ['quantity', 'price', 'OrderId', 'ItemId']
                },
                include: [
                  {
                    model: Store
                  }
                ]
              }
            ],
            order: [['createdAt', 'DESC']]
          });

          const openStores = await Store.findOpenStores();
          
          res.render("dashboard/user", {ongoingOrder, openStores, formatIDR, user: req.session.user });
          break;
        case "mitra":
          res.render("dashboard/mitra", { user: req.session.user });
          break;
        default:
          throw new Error("No such role");
      }
    } catch (error) {
      console.log(error);
      
      res.send(error);
    }
  }

  static async profile(req, res) {
    try {
      console.log(req.session.user.id);

      const user = await User.findOne({
        include: Profile,
        where: {
          id: req.session.user.id,
        },
      });
      res.render("profiles", { user, calculateAge, session: req.session });
    } catch (error) {
      res.send(error);
    }
  }

  static async showEditProfile(req, res){
    try {
      const user = await User.findOne({
        include: Profile,
        where: {
          id: req.session.user.id,
        },
      });
      res.render("profile-edit", { user, calculateAge, errors: {}, session: req.session });
    } catch (error) {
      res.send(error);
    }
  }

  static async editProfile(req, res) {
    let { firstName, lastName, gender, dateOfBirth, profilePicture, phoneNumber, address } = req.body;
  try {
    const user = await Profile.findOne({ where: { UserId: req.session.user.id } });
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (gender) updateData.gender = gender;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (profilePicture && profilePicture !== '') updateData.profilePicture = profilePicture;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;
    
    if (Object.keys(updateData).length > 0) {
      await user.update(updateData);
    }
    
    req.session.user.name = user.firstName;
    req.session.user.profilePicture = user.profilePicture;
    res.redirect("/profile");
  } catch (error) {
    let errors = {};
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      error.errors.forEach((err) => (errors[err.path] = { message: err.message }));
    }

    res.render("profile-setup", { errors, user: req.session.user });
  }
  }

  static async deleteUser(req, res){
    try {
      const {id} = req.params;
      const deletedUser = await User.findOne({
        include: Profile,
        where: {
          id: id
        }
      });
      await User.destroy({
        where: {id: id}
      });
      
      res.redirect(`/dashboard?deleted=${deletedUser.Profile.fullName}`)
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
