'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schoolSetting', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      branchName: {
        type: Sequelize.STRING
      },
      branchCode: {
        type: Sequelize.STRING
      },
      schoolName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      currencySymbol: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      teacherRestricted: {
        type: Sequelize.BOOLEAN
      },
      studentLoginUsernamePrefix: {
        type: Sequelize.STRING
      },
      studentLoginDefaultPassword: {
        type: Sequelize.STRING
      },
      guardianLoginUsernamePrefix: {
        type: Sequelize.STRING
      },
      guardianLoginDefaultPassword: {
        type: Sequelize.STRING
      },
      systemLogo: {
        type: Sequelize.STRING
      },
      textLogo: {
        type: Sequelize.STRING
      },
      printingLogo: {
        type: Sequelize.STRING
      },
      reportCard: {
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
    await queryInterface.dropTable('schoolSetting');
  }
};