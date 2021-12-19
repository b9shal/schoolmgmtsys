'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class designation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      designation.hasOne(models.employee, { foreignKey: "designationId" })
    }
  };
  designation.init({
    designationName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'designation',
    tableName: 'designation'
  })
  return designation
}