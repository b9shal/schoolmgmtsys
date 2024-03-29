'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admissionCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      admissionCategory.hasOne(models.admission, { foreignKey: "admissionCategoryId"} )
    }
  };
  admissionCategory.init({
    categoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admissionCategory',
    tableName: 'admissionCategory',
  });
  return admissionCategory;
};