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
      // define association here
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