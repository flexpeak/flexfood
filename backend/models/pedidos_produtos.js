'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedidos_produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pedidos_produtos.init({
    pedido_id: DataTypes.INTEGER,
    produto_id: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'pedidos_produtos',
  });
  return pedidos_produtos;
};