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

      //associations for admission
      admission.belongsTo(models.classRoom, { foreignKey: "classRoomId" })
      admission.belongsTo(models.section, { foreignKey: "sectionId" })
      admission.belongsTo(models.admissionCategory, { foreignKey: "admissionCategoryId" })
      admission.belongsTo(models.guardian, { foreignKey: "guardianId" })
      
      //associations for hostel
      admission.belongsTo(models.hostel, { foreignKey: { name: "hostelId", allowNull: true } })
      admission.belongsTo(models.hostelRoom, { foreignKey: { name: "hostelRoomId", allowNull: true } })


      //associations for vehicle
      admission.belongsTo(models.vehicleRoute, { foreignKey: { name: "vehicleRouteId", allowNull: true } })
      admission.belongsTo(models.vehicle, { foreignKey: { name: "vehicleId", allowNull: true } })


      admission.hasMany(models.student, { foreignKey: "admissionId" })

      admission.hasMany(models.studentAttendance, { foreignKey: "admissionId" }) 
      admission.hasMany(models.markEntry, { foreignKey: "admissionId" })
    }
  };
  admission.init({
    academicYear: {
      type: DataTypes.DATE,
      allowNull: false
    },
    registerNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admissionDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true
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
      type: DataTypes.DATE,
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