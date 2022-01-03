'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicleRoute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      vehicleRoute.hasOne(models.vehicleAssign, { foreignKey: "vehicleRouteId"})
      vehicleRoute.hasMany(models.admission, { foreignKey: { name: "vehicleRouteId", allowNull: true } })
    }
  };
  vehicleRoute.init({
    routeName: DataTypes.STRING,
    startPlace: DataTypes.STRING,
    stopPlace: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicleRoute',
    tableName: 'vehicleRoute',
  });
  return vehicleRoute;
};