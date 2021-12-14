'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      bookRequest.belongsTo(models.book, { foreignKey: "bookId" })
    }
  };
  bookRequest.init({
    dateOfIssue: DataTypes.STRING,
    dateOfExpiry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookRequest',
    tableName: 'bookRequest'
  });
  return bookRequest;
};