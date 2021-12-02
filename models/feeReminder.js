'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeReminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  feeReminder.init({
    frequency: {
      type: DataTypes.STRING
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING
    },
    notify: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'feeReminder',
    tableName: 'feeReminder'
  });
  return feeReminder;
};