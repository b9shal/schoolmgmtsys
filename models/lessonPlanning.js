'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lessonPlanning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      lessonPlanning.belongsTo(models.classRoom, { foreignKey: "classRoomId"})
      lessonPlanning.belongsTo(models.section, { foreignKey: "sectionId"})
      lessonPlanning.belongsTo(models.employee, { foreignKey: "employeeId"})
      lessonPlanning.belongsTo(models.subject, { foreignKey: "subjectId"})
    }
  };
  lessonPlanning.init({
    topic: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'lessonPlanning',
    tableName: 'lessonPlanning',
  });
  return lessonPlanning;
};