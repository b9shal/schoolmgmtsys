'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examTerm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      examTerm.hasMany(models.exam, { foreignKey: "examTermId" })
      examTerm.hasMany(models.markEntry, { foreignKey: "examTermId" })
    }
  };
  examTerm.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'examTerm',
    tableName: 'examTerm',
  });
  return examTerm;
};