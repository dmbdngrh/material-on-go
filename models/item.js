'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Store);
      Item.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: 'ItemId'
      });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING,
    StoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};