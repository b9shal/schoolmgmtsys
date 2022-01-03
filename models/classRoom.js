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

      classRoom.hasMany(models.classSection, { foreignKey: "classRoomId" })

      classRoom.hasMany(models.classAssign, { foreignKey: "classRoomId" })

      classRoom.hasOne(models.student, { foreignKey: "classRoomId" })

      classRoom.hasOne(models.assignClassTeacher, { foreignKey: "classRoomId" })

      classRoom.hasMany(models.lessonPlanning, { foreignKey: "classRoomId" })

      classRoom.hasMany(models.markEntry, { foreignKey: "classRoomId" })

      classRoom.hasMany(models.homeWork, { foreignKey: "classRoomId" })

      classRoom.hasMany(models.liveClass, { foreignKey: "classRoomId" })

      classRoom.hasMany(models.attachmentBook, { foreignKey: { name: "classRoomId", allowNull: false } })
    }
  };
  classRoom.init({
    className: DataTypes.STRING,
    classNo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classRoom',
    tableName: 'classRoom'
  })
  return classRoom;
};