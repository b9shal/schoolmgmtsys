'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      eventType.hasMany(models.event, { foreignKey: "eventTypeId", allowNull: true })
    }
  };
  eventType.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'eventType',
    tableName: 'eventType',
  });
  return eventType;
};