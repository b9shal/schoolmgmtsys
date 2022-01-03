'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      vehicle.hasMany(models.vehicleAssign, { foreignKey: "vehicleId" })
      vehicle.hasOne(models.admission, { foreignKey: "vehicleId" })
    }
  };
  vehicle.init({
    vehicleNo: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    renewalDate: DataTypes.DATE,
    driverName: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    driverLicense: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicle',
    tableName: 'vehicle'
  });
  return vehicle;
};