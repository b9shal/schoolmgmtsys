'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hostelRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      hostelRoom.belongsTo(models.hostelCategory, { foreignKey: "hostelCategoryId" })
      hostelRoom.belongsTo(models.hostel, { foreignKey: "hostelId" })
      hostelRoom.hasMany(models.admission, { foreignKey: { name: "hostelRoomId", allowNull: true } })
    }
  };
  hostelRoom.init({
    roomName: DataTypes.STRING,
    numberOfBeds: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
    costPerBed: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'hostelRoom',
    tableName: 'hostelRoom',
  });
  return hostelRoom;
};