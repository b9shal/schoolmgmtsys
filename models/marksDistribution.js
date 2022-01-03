'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class marksDistribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      marksDistribution.hasMany(models.exam, { foreignKey: "marksDistributionId"})
    }
  };
  marksDistribution.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'marksDistribution',
    tableName: 'marksDistribution'
  });
  return marksDistribution;
};