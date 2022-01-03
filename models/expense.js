'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      expense.belongsTo(models.account, { foreignKey: "accountId" })
      expense.belongsTo(models.voucherHead, { foreignKey: "voucherHeadId" })
    }
  };
  expense.init({
    ref: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    payVia: DataTypes.STRING,
    description: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'expense',
    tableName: 'expense',
  });
  return expense;
};