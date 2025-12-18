'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async checkPassword(password){
      return await bcrypt.compare(password, this.password);
    }
    static associate(models) {
      User.hasOne(models.Profile);
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg: 'Invalid email format'},
        notNull: {msg: 'Email is required'},
        notEmpty: {msg: 'Email is required'},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Password is required'},
        notEmpty: {msg: 'Password is required'},
        min: {
          args: 8,
          msg: 'Password must be at least 8 characters'
        },
        matchConfirmation(value){          
          if(value !== this.confirmPassword)
            throw new Error("Pasword do not match");
        }
      }
    },
    confirmPassword: {
        type: DataTypes.VIRTUAL,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false,
      validate: {
        notNull: {msg: 'User role is not assigned'},
        notEmpty: {msg: 'User role is not assigned'},
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, option) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  User.beforeUpdate(async (user, option) => {
    if(user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
  return User;
};