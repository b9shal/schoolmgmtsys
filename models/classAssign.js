'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classAssign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      classAssign.belongsTo(models.classRoom, { foreignKey: "classRoomId"} )
      classAssign.belongsTo(models.section, { foreignKey: "sectionId"} )
      classAssign.belongsTo(models.subject, { foreignKey: "subjectId"} )
    }
  };
  classAssign.init({
    classRoomId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classAssign',
    tableName: 'classAssign',
  });
  return classAssign;
};