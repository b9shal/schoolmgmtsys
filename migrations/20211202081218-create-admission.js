'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      academicYear: {
        type: Sequelize.DATE,
        allowNull: false
      },
      registerNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roll: {
        type: Sequelize.INTEGER
      },
      admissionDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      middleName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bloodGroup: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      motherTongue: {
        type: Sequelize.STRING
      },
      religion: {
        type: Sequelize.STRING
      },
      caste: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      presentAddress: {
        type: Sequelize.STRING
      },
      permanentAddress: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      previousSchoolName: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admission');
  }
};