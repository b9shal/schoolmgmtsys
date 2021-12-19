'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      role.hasOne(models.bookIssue, { foreignKey: "roleId" })
      role.hasOne(models.user, { foreignKey: "roleId" })
      role.hasOne(models.employee, { foreignKey: "roleId" })
    }
  };
  role.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
    tableName: 'role'
  })
  return role
}