'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produtos_favoritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.produtos, {
        as: 'produto',
        foreignKey: 'produto_id'
      })

      this.belongsTo(models.usuarios, {
        as: 'usuario',
        foreignKey: 'usuario_id'
      })
    }
  }
  produtos_favoritos.init({
    usuario_id: DataTypes.INTEGER,
    produto_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'produtos_favoritos',
  });
  return produtos_favoritos;
};