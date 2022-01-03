'use strict';
const {
  Model
} = require('sequelize');
const vehicle = require('./vehicle');
module.exports = (sequelize, DataTypes) => {
  class vehicleAssign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      vehicleAssign.belongsTo(models.vehicle, { foreignKey: "vehicleId" })
      vehicleAssign.belongsTo(models.vehicleRoute, { foreignKey: "vehicleRouteId" })
      vehicleAssign.belongsTo(models.stoppAge, { foreignKey: "stoppAgeId" })

      vehicleAssign.hasMany(models.admission, { foreignKey: { name: "vehicleAssignId", allowNull: true } })
    }
  };
  vehicleAssign.init({
    vehicleRouteId: DataTypes.INTEGER,
    stoppageId: DataTypes.INTEGER,
    vehicleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vehicleAssign',
    tableName: 'vehicleAssign',
  });
  return vehicleAssign;
};