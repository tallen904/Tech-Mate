'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeSkills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      html: {
        type: Sequelize.INTEGER
      },
      css: {
        type: Sequelize.INTEGER
      },
      javascript: {
        type: Sequelize.INTEGER
      },
      nodejs: {
        type: Sequelize.INTEGER
      },
      reactjs: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmployeeSkills');
  }
};