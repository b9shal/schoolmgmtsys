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

      employee.hasMany(models.employeeDepartmentDesignation, { foreignKey: "employeeId"} )

    }
  };
  employee.init({
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
    tableName: 'employee',
  });
  return employee;
};