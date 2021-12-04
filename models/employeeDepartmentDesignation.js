'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeDepartmentDesignation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employeeDepartmentDesignation.belongsTo(models.employee, { foreignKey: "employeeId"} )
      employeeDepartmentDesignation.belongsTo(models.department, { foreignKey: "departmentId"} )
      employeeDepartmentDesignation.belongsTo(models.designation, { foreignKey: "designationId"} )
    }
  };
  employeeDepartmentDesignation.init({
    employeeId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    designationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employeeDepartmentDesignation',
    tableName: 'employeeDepartmentDesignation',
  });
  return employeeDepartmentDesignation;
};