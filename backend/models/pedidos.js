'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.produtos, {
        as: 'produtos',
        through: 'pedidos_produtos',
        foreignKey: 'pedido_id',
        otherKey: 'produto_id'
      })

      this.hasMany(models.pedidos_produtos, {
        as: 'pedidos_produtos',
        foreignKey: 'pedido_id'
      })

      this.belongsTo(models.usuarios, {
        as: 'usuario',
        foreignKey: 'usuario_id'
      })

      this.belongsTo(models.restaurantes, {
        as: 'restaurante',
        foreignKey: 'restaurante_id'
      })
    }

    static async calculaValorTotal(id) {
      const pedido = await this.findOne({
        where: { id: id },
        include: 'pedidos_produtos'
      })

      let valor_total = 0
      pedido.pedidos_produtos.forEach((produto) => {
        valor_total += Number(produto.valor)
      })

      await pedido.update({
        valor_total: valor_total
      })
    }
  }
  pedidos.init({
    usuario_id: DataTypes.INTEGER,
    restaurante_id: DataTypes.INTEGER,
    status: DataTypes.CHAR(1),
    valor_total: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'pedidos',
  });
  return pedidos;
};