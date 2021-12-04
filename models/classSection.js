'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      classSection.belongsTo(models.classRoom, {foreignKey: "classRoomId" })
      classSection.belongsTo(models.section, {foreignKey: "sectionId" })
    }
  };
  classSection.init({
    classRoomId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classSection',
    tableName: 'classSection',
  });
  return classSection;
};