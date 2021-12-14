'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      student.belongsTo(models.admission, { foreignKey: "admissionId"} )
      student.belongsTo(models.classRoom, { foreignKey: "classRoomId"} )
      student.belongsTo(models.section, { foreignKey: "sectionId"} )
      student.belongsTo(models.guardian, { foreignKey: "guardianId"} )
    }
  };
  student.init({
    admissionId: DataTypes.INTEGER,
    classRoomId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    guardianId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'student',
    tableName: 'student'
  });
  return student;
};