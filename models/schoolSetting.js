'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schoolSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  schoolSetting.init({
    branchName: DataTypes.STRING,
    branchCode: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    currency: DataTypes.STRING,
    currencySymbol: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    teacherRestricted: DataTypes.BOOLEAN,
    studentLoginUsernamePrefix: DataTypes.STRING,
    studentLoginDefaultPassword: DataTypes.STRING,
    guardianLoginUsernamePrefix: DataTypes.STRING,
    systemLogo: DataTypes.STRING,
    textLogo: DataTypes.STRING,
    printingLogo: DataTypes.STRING,
    reportCard: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'schoolSetting',
    tableName: 'schoolSetting'
  });
  return schoolSetting;
};