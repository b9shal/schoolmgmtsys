'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stock.hasMany(models.item, { foreignKey: "itemId" });
      stock.hasMany(models.vendor, { foreignKey: "vendorId" });
    }
  };
  stock.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'stock',
    tableName: 'stock'
  });
  return stock;
};