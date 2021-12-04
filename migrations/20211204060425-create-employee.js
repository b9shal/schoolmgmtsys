'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      experienceDetail: {
        type: Sequelize.STRING
      },
      totalExperience: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      religion: {
        type: Sequelize.STRING
      },
      bloodGroup: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      mobile: {
        type: Sequelize.STRING
      },
      email: {
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
      skipLogAuth: {
        type: Sequelize.BOOLEAN
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      holderName: {
        type: Sequelize.STRING
      },
      bankBranch: {
        type: Sequelize.STRING
      },
      bankAddress: {
        type: Sequelize.STRING
      },
      ifscCode: {
        type: Sequelize.STRING
      },
      accountNumber: {
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
    await queryInterface.dropTable('employee');
  }
};