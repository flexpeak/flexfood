'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2)
      },
      foto: {
        type: Sequelize.STRING
      },
      restaurante_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'restaurantes'
          },
          key: 'id'
        }
      },
      descricao: {
        type: Sequelize.TEXT
      },
      quantidade_estoque: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};