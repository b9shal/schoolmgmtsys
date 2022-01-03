'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      studentAttendance.belongsTo(models.admission, { foreignKey: "admissionId"})
    }
  };
  studentAttendance.init({
    status: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'studentAttendance',
    tableName: 'studentAttendance',
  });
  return studentAttendance;
};