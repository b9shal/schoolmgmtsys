'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class liveClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      liveClass.belongsTo(models.classRoom, { foreignKey: "classRoomId"} )
      liveClass.belongsTo(models.section, { foreignKey: "sectionId"} )
    }
  };
  liveClass.init({
    title: DataTypes.STRING,
    liveClassMethod: DataTypes.STRING,
    date: DataTypes.DATE,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    remarks: DataTypes.STRING,
    sendNotificationSms: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'liveClass',
    tableName: 'liveClass',
  });
  return liveClass;
};