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

      subject.hasMany(models.classAssign, { foreignKey: "subjectId" })

      subject.hasMany(models.lessonPlanning, { foreignKey: "subjectId" })

      subject.hasMany(models.markEntry, { foreignKey: "subjectId" })

      subject.hasMany(models.homeWork, { foreignKey: "subjectId" })

      subject.hasMany(models.attachmentBook, { foreignKey: "subjectId" })
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