'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stoppAge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stoppAge.hasMany(models.vehicleAssign, { foreignKey: "stoppAgeId"} )
    }
  };
  stoppAge.init({
    stoppage: DataTypes.STRING,
    stopTime: DataTypes.STRING,
    routeFare: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'stoppAge',
    tableName: 'stoppAge'
  });
  return stoppAge;
};