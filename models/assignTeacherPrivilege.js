'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignTeacherPrivilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  assignTeacherPrivilege.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'assignTeacherPrivilege',
    tableName: 'assignTeacherPrivilege',
  });
  return assignTeacherPrivilege;
};