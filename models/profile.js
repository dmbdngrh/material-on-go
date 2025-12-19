"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static defaultProfilePicture(){
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s';
    }
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }

    get fullName(){
      return `${this.firstName} ${this.lastName}`
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please write your first name" },
          notEmpty: { msg: "Please write your first name" },
        },
      },
      lastName: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: "Please select your gender"},
          notEmpty: {msg: "Please select your gender"},
        }
      },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s",
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {msg: "Please input date of birth"},
          notEmpty: {msg: "Please input date of birth"},
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: "Please input your phone number"},
          notEmpty: {msg: "Please input your phone number"},
        }
      },
      latitude: DataTypes.DECIMAL(10, 8),
      longitude: DataTypes.DECIMAL(10, 8),
      address: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
