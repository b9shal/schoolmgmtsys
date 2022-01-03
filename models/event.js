'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      event.belongsTo(models.eventType, { foreignKey: "eventTypeId", allowNull: true })
    }
  };
  event.init({
    title: DataTypes.STRING,
    holiday: DataTypes.BOOLEAN,
    audience: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
    showWebsite: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
    tableName: 'event'
  });
  return event;
};