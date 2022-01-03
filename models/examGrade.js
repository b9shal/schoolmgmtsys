'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examGrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  examGrade.init({
    name: DataTypes.STRING,
    gradePoint: DataTypes.INTEGER,
    minPercentage: DataTypes.INTEGER,
    maxPercentage: DataTypes.INTEGER,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'examGrade',
    tableName: 'examGrade',
  });
  return examGrade;
};