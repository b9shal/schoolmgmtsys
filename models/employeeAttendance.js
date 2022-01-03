'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employeeAttendance.belongsTo(models.role, { foreignKey: "roleId" })
    }
  };
  employeeAttendance.init({
    status: DataTypes.STRING,
    remarks: DataTypes.STRING,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'employeeAttendance',
    tableName: 'employeeAttendance'
  });
  return employeeAttendance;
};