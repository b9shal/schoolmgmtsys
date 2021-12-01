'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feeTypeFeeGroup', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      feeTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      feeGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('feeTypeFeeGroup');
  }
};