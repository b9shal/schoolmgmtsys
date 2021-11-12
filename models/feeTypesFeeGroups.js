'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeTypesFeeGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      feeTypesFeeGroups.belongsTo(models.feeTypes, { foreignKey: "feeTypeGroupId", constraints: false });
      feeTypesFeeGroups.belongsTo(models.feeGroups, { foreignKey: "feeTypeGroupId", constraints: false });
    }
  };
  feeTypesFeeGroups.init({
    feeTypeFeeGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'feeTypesFeeGroups'
  });
  return feeTypesFeeGroups;
};