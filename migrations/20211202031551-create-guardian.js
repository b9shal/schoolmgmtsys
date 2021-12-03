'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guardian', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      relation: {
        type: Sequelize.STRING
      },
      fatherName: {
        type: Sequelize.STRING
      },
      motherName: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      income: {
        type: Sequelize.DECIMAL
      },
      education: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      skipLoginAuth: {
        type: Sequelize.BOOLEAN
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
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      retypePassword: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('guardian');
  }
};