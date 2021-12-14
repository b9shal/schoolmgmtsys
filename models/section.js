'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      section.hasMany(models.admission, { foreignKey: "sectionId" })
      section.hasMany(models.student, { foreignKey: "sectionId" })
    }
  };
  section.init({
    sectionName: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'section',
    tableName: 'section',
  });
  return section;
};