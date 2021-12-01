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
      feeTypeFeeGroup.belongsTo(models.feeType, { foreignKey: "feeTypeId" })
      
      feeTypeFeeGroup.belongsTo(models.feeGroup, { foreignKey: "feeGroupId" })

      feeTypeFeeGroup.hasOne(models.fine, { foreignKey: "feeTypeFeeGroupId" })
    }
  };
  feeTypeFeeGroup.init({
    dueDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    feeTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    feeGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'feeTypeFeeGroup',
    tableName: 'feeTypeFeeGroup',
  });
  return feeTypeFeeGroup;
};