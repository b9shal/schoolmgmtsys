'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fine.init({
    fineType: DataTypes.INTEGER,
    fineValue: DataTypes.DECIMAL,
    lateFeeFrequency: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fine',
  });
  return fine;
};