'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      bookCategory.hasMany(models.book, { foreignKey: "booKCategoryId" })
    }
  };
  bookCategory.init({
    categoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookCategory',
    tableName: 'bookCategory'
  });
  return bookCategory
}