'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER, 
        references: {
          model: {
            tableName: 'usuarios'
          },
          key: 'id'
        }
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
      status: {
        type: Sequelize.CHAR(1)
      },
      valor_total: {
        type: Sequelize.DECIMAL(10,2)
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
    await queryInterface.dropTable('pedidos');
  }
};