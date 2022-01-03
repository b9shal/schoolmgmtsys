'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      book.belongsTo(models.bookCategory, { foreignKey: "bookCategoryId" })
      book.hasOne(models.bookIssue, { foreignKey: "bookId" })
      book.hasMany(models.bookRequest, { foreignKey: "bookId" })
    }
  };
  book.init({
    title: DataTypes.STRING,
    isbn: DataTypes.STRING,
    author: DataTypes.STRING,
    edition: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
    publisher: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    coverImage: DataTypes.STRING,
    totalStock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
    tableName: 'book',
  });
  return book;
};