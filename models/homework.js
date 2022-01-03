'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homeWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      homeWork.belongsTo(models.classRoom, { foreignKey: "classRoomId" })
      homeWork.belongsTo(models.section, { foreignKey: "sectionId" })
      homeWork.belongsTo(models.subject, { foreignKey: "subjectId" })
    }
  };
  homeWork.init({
    dateOfHomeWork: DataTypes.DATE,
    dateOfSubmission: DataTypes.DATE,
    publishLater: DataTypes.BOOLEAN,
    scheduleDate: DataTypes.DATE,
    homework: DataTypes.STRING,
    file: DataTypes.STRING,
    sendNotificationSms: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'homeWork',
    tableName: 'homeWork',
  });
  return homeWork;
};