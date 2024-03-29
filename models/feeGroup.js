'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      feeGroup.hasMany(models.feeTypeFeeGroup, { foreignKey: "feeGroupId" });

      feeGroup.hasOne(models.fine, { foreignKey: "feeGroupId" })
    }
  };
  feeGroup.init({
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'feeGroup',
    tableName: "feeGroup"
  });
  return feeGroup;
};