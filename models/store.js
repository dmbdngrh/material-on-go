'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static async findOpenStores(){
      return await Store.findAll({where: {isOpen: true}, include:this.sequelize.models.Item});
    }
    static associate(models) {
      // define association here
      Store.hasMany(models.Item);
    }
  }
  Store.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    isOpen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};