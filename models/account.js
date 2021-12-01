'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  account.init({
    accountName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    openingBalance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'account',
    tableName: "account"
  });
  return account;
};