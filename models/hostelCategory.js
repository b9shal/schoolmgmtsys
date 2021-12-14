'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hostelCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      hostelCategory.hasMany(models.hostelRoom, { foreignKey: "hostelCategoryId" })
      hostelCategory.hasMany(models.hostel, { foreignKey: "hostelCategoryId" })
    }
  };
  hostelCategory.init({
    categoryName: DataTypes.STRING,
    type: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hostelCategory',
    tableName: 'hostelCategory',
  });
  return hostelCategory;
};