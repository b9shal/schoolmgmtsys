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

      section.hasMany(models.classSection, { foreignKey: "sectionId" })

      section.hasMany(models.classAssign, { foreignKey: "sectionId" })

      section.hasMany(models.student, { foreignKey: "sectionId" })

      section.hasMany(models.lessonPlanning, { foreignKey: "sectionId" })

      section.hasMany(models.markEntry, { foreignKey: "sectionId" })

      section.hasMany(models.homeWork, { foreignKey: "sectionId" })

      section.hasMany(models.liveClass, { foreignKey: "sectionId" })

      section.hasMany(models.assignClassTeacher, { foreignKey: { name:"sectionId", allowNull: false } })
    }
  };
  section.init({
    sectionName: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'section',
    tableName: 'section'
  });
  return section;
};