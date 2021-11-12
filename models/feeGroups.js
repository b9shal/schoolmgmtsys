'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      feeGroups.hasMany(models.feeTypesFeeGroups, { 
        foreignKey: "feeTypeFeeGroupId",
        constraints: false,
        scope: {
          ofType: 'feeGroups'
        }
      });
    }
  };
  feeGroups.init({
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'feeGroups',
  });
  return feeGroups;
};