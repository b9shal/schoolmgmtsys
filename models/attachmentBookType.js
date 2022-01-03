'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachmentBookType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attachmentBookType.init({
    typeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'attachmentBookType',
    tableName: 'attachmentBookType'
  });
  return attachmentBookType;
};