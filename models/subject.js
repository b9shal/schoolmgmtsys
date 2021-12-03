'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  subject.init({
    subjectName: DataTypes.STRING,
    subjectCode: DataTypes.INTEGER,
    subjectAuthor: DataTypes.STRING,
    subjectType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subject',
    tableName: 'subject',
  });
  return subject;
};