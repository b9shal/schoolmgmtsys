'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      examSchedule.belongsTo(models.examTerm, { foreignKey: "examTermId"})
      examSchedule.belongsTo(models.classRoom, { foreignKey: "classRoomId"})
      examSchedule.belongsTo(models.section, { foreignKey: "sectionId"})
      examSchedule.belongsTo(models.subject, { foreignKey: "subjectId"})
      examSchedule.belongsTo(models.examHall, { foreignKey: "examHallId"})
    }
  };
  examSchedule.init({
    examDate: DataTypes.DATE,
    examDuration: DataTypes.INTEGER,
    startingTime: DataTypes.STRING,
    endingTime: DataTypes.STRING,
    fullMarks: DataTypes.INTEGER,
    passMarks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'examSchedule',
    tableName: 'examSchedule',
  });
  return examSchedule;
};