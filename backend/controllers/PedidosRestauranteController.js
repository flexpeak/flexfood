const { pedidos, produtos, usuarios } = require('../models')
const { Op } = require("sequelize")

module.exports = class PedidosRestauranteController {
    static async index(req, res) {
        try {
            const list = await pedidos.findAll({
                where: {
                    restaurante_id: req.restauranteId,
                    status: {
                        [Op.notIn]: ['C']
                    }
                },
                include: [{
                    model: produtos,
                    as: 'produtos'
                }, {
                    model: usuarios,
                    as: 'usuario',
                    attributes: ['id', 'nome', 'email', /* endereco */]
                }]
            })

            res.json(list)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async updateConfirmado(req, res) {
        try {
            const { id } = req.params

            const pedido = await pedidos.findByPk(id)
            await pedido.update({
                status: 'V' // Validado - Verificado
            })

            res.json({
                success: true
            })
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async updateSaiuEntrega(req, res) {
        try {
            const { id } = req.params
            
            const pedido = await pedidos.findByPk(id)
            await pedido.update({
                status: 'J' // Já saiu pra entrega
            })

            res.json({
                success: true
            })
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async updateEntregue(req, res) {
        try {
            const { id } = req.params

            const pedido = await pedidos.findByPk(id)
            await pedido.update({
                status: 'E' // entregue
            })

            res.json({
                success: true
            })
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }
}