'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      admission.belongsTo(models.classRoom, { foreignKey: "classRoomId" })
      // admission.belongsTo(models.section, { foreignKey: "sectionId" })
      admission.belongsTo(models.admissionCategory, { foreignKey: "admissionCategoryId" })
      admission.belongsTo(models.guardian, { foreignKey: "guardianId" })
      admission.belongsTo(models.vehicleRoute, { foreignKey: "vehicleRouteId" })
      admission.belongsTo(models.vehicle, { foreignKey: "vehicleId" })
      admission.belongsTo(models.hostel, { foreignKey: "hostelId" })
      admission.belongsTo(models.hostelRoom, { foreignKey: "hostelRoomId" })

      admission.hasOne(models.student, { foreignKey: "admissionId" }) 
    }
  };
  admission.init({
    std: {
      type: DataTypes.STRING,
      allowNull: false
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    academicYear: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registerNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admissionDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bloodGroup: DataTypes.STRING,
    roll: DataTypes.INTEGER,
    motherTongue: DataTypes.STRING,
    religion: DataTypes.STRING,
    caste: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    presentAddress: DataTypes.STRING,
    permanentAddress: DataTypes.STRING,
    photo: DataTypes.STRING,
    transportRoute: DataTypes.STRING,
    vehicleNo: DataTypes.STRING,
    hostelName: DataTypes.STRING,
    roomNo: DataTypes.STRING,
    previousSchoolName: DataTypes.STRING,
    qualification: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admission',
    tableName: 'admission',
  });
  return admission;
};