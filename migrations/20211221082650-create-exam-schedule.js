'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('examSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      examDate: {
        type: Sequelize.DATE
      },
      examDuration: {
        type: Sequelize.INTEGER
      },
      startingTime: {
        type: Sequelize.STRING
      },
      endingTime: {
        type: Sequelize.STRING
      },
      fullMarks: {
        type: Sequelize.INTEGER
      },
      passMarks: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('examSchedules');
  }
};