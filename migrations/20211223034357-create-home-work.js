'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('homeWork', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateOfHomeWork: {
        type: Sequelize.DATE
      },
      dateOfSubmission: {
        type: Sequelize.DATE
      },
      publishLater: {
        type: Sequelize.BOOLEAN
      },
      scheduleDate: {
        type: Sequelize.DATE
      },
      homework: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      sendNotificationSms: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('homeWork');
  }
};