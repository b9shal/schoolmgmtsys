'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hostel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      hostel.hasMany(models.hostelRoom, { foreignKey: "hostelId" })
      hostel.hasMany(models.admission, { foreignKey: { name: "hostelId", allowNull: true } })
      hostel.belongsTo(models.hostelCategory, { foreignKey: "hostelCategoryId" })
    }
  };
  hostel.init({
    hostelName: DataTypes.STRING,
    watchmanName: DataTypes.STRING,
    hostelAddress: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hostel',
    tableName: 'hostel'
  });
  return hostel;
};