'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeTypeFeeGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      feeTypeFeeGroup.belongsTo(models.feeType, { foreignKey: "feeTypeId"});
      feeTypeFeeGroup.belongsTo(models.feeGroup, { foreignKey: "feeGroupId" });
    }
  };
  feeTypeFeeGroup.init({
    feeTypeId: {
      type: DataTypes.INTEGER,
    },
    feeGroupId: {
      type: DataTypes.INTEGER,
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
    modelName: 'feeTypeFeeGroup'
  });
  return feeTypeFeeGroup;
};