'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class markEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      markEntry.belongsTo(models.examTerm, { foreignKey: "examTermId" })
      markEntry.belongsTo(models.classRoom, { foreignKey: "classRoomId" })
      markEntry.belongsTo(models.section, { foreignKey: "sectionId" })
      markEntry.belongsTo(models.subject, { foreignKey: "subjectId" })
      markEntry.belongsTo(models.admission, { foreignKey: "admissionId" })
    }
  };
  markEntry.init({
    isAbsent: DataTypes.BOOLEAN,
    practicalMarks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'markEntry',
    tableName: 'markEntry'
  });
  return markEntry;
};