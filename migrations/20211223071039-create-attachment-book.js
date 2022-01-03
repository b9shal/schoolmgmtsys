'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachmentBook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      notAccordingToSubject: {
        type: Sequelize.BOOLEAN
      },
      publishDate: {
        type: Sequelize.DATE
      },
      remarks: {
        type: Sequelize.STRING
      },
      attachmentFile: {
        type: Sequelize.STRING
      },
      availableForAllClasses: {
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
    await queryInterface.dropTable('attachmentBook');
  }
};