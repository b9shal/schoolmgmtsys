'use strict';
const {
  Model
} = require('sequelize');
const exam = require('./exam');
module.exports = (sequelize, DataTypes) => {
  class examHall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      examHall.hasMany(models.examSchedule, { foreignKey: "examHallId"} )
    }
  };
  examHall.init({
    hallNo: DataTypes.STRING,
    noOfSeats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'examHall',
    tableName: 'examHall'
  });
  return examHall;
};