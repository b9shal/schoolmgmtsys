'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      employee.belongsTo(models.department, { foreignKey: "departmentId"} )
      employee.belongsTo(models.designation, { foreignKey: "designationId"} )
      employee.belongsTo(models.role, { foreignKey: "roleId"})

      employee.hasMany(models.assignClassTeacher, { foreignKey: { name:"employeeId", allowNull: false } })

      employee.hasMany(models.lessonPlanning, { foreignKey: "employeeId" })

    }
  }
  employee.init({
    joiningDate: DataTypes.DATE,
    qualification: DataTypes.STRING,
    experienceDetail: DataTypes.STRING,
    totalExperience: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    religion: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    dob: DataTypes.DATE,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    presentAddress: DataTypes.STRING,
    permanentAddress: DataTypes.STRING,
    photo: DataTypes.STRING,
    skipLogAuth: DataTypes.BOOLEAN,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    bankName: DataTypes.STRING,
    holderName: DataTypes.STRING,
    bankBranch: DataTypes.STRING,
    bankAddress: DataTypes.STRING,
    ifscCode: DataTypes.STRING,
    accountNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee',
    tableName: 'employee'
  })
  return employee;
};