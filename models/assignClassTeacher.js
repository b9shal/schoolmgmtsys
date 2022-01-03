'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignClassTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      assignClassTeacher.belongsTo(models.employee, { foreignKey: { name: "employeeId", allowNull: false } })
      assignClassTeacher.belongsTo(models.classRoom, { foreignKey: { name: "classRoomId", allowNull: false } })
      assignClassTeacher.belongsTo(models.section, { foreignKey: { name: "sectionId", allowNull: false } })
    }
  };
  assignClassTeacher.init({
    classRoomId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'assignClassTeacher',
    tableName: 'assignClassTeacher'
  });
  return assignClassTeacher
};