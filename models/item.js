'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      item.belongsTo(models.itemCategory, { foreignKey: "itemCategoryId" });
      item.hasMany(models.stock, { foreignKey: "itemId" });
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