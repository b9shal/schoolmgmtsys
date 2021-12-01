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
      fine.belongsTo(models.feeType, { foreignKey: "feeTypeId" })
      fine.belongsTo(models.feeGroup, { foreignKey: "feeGroupId" })
    }
  };
  fine.init({
    fineType: DataTypes.STRING,
    fineValue: DataTypes.DECIMAL,
    lateFeeFrequency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fine',
    tableName: "fine"
  });
  return fine;
};