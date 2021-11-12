'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      feeTypes.hasMany(models.feeTypesFeeGroups, { 
        foreignKey: "feeTypeGroupId",
         constraints: false,
        scope: {
        ofType: 'feeTypes'
        }
      });
    }
  };
  feeTypes.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'feeTypes',
  });
  return feeTypes;
};