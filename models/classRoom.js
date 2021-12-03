'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      classRoom.belongsTo(models.section, { foreignKey: "sectionId" })
    }
  };
  classRoom.init({
    className: DataTypes.STRING,
    classNo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classRoom',
    tableName: 'classRoom',
  });
  return classRoom;
};