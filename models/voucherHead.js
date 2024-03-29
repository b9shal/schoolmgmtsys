'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voucherHead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      voucherHead.hasMany(models.deposit, { foreignKey: "voucherHeadId" })
      voucherHead.hasMany(models.expense, { foreignKey: "voucherHeadId" })
    }
  };
  voucherHead.init({
    voucherName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'voucherHead',
    tableName: 'voucherHead'
  });
  return voucherHead;
};