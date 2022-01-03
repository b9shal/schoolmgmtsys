'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      bookIssue.belongsTo(models.role, { foreignKey: "roleId" })
      bookIssue.belongsTo(models.book, { foreignKey: "bookId" })
      bookIssue.belongsTo(models.bookCategory, { foreignKey: "bookCategoryId" })
      bookIssue.belongsTo(models.user, { foreignKey: "userId" })
    }
  };
  bookIssue.init({
    dateOfExpiry: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'bookIssue',
    tableName: 'bookIssue'
  });
  return bookIssue;
};