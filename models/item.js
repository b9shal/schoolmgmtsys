'use strict';
const {
  Model
} = require('sequelize');
const itemCategory = require('./itemCategory');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      item.belongsTo(models.itemCategory, {
        foreignKey: "itemCategoryId" });
=======
      item.belongsTo(itemCategory, { 
        foreignKey: "itemCategoryId" })
      
      item.belongsTo(stock, { 
        foreignKey: "stockId" });
>>>>>>> a64b437 (added models item and vendor)
    }
  };
  item.init({
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'item',
    tableName: 'item'
  });
  return item;
};