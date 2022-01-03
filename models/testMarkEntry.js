'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testMarkEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      testMarkEntry.belongsTo(models.classRoom, { foreignKey: "classRoomId" })
      testMarkEntry.belongsTo(models.section, { foreignKey: "sectionId" })
      testMarkEntry.belongsTo(models.subject, { foreignKey: "subjectId" })
      testMarkEntry.belongsTo(models.admission, { foreignKey: "admissionId" })
    }
  };
  testMarkEntry.init({
    isAbsent: DataTypes.BOOLEAN,
    marksObtained: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'testMarkEntry',
    tableName: 'testMarkEntry',
  });
  return testMarkEntry;
};