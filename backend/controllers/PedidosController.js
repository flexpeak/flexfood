const { pedidos } = require('../models')

module.exports = class PedidosController {
    static async index(req, res) {
        try {
            const list = await pedidos.findAll({
                where: {
                    usuario_id: req.usuarioId
                }
            })

            res.json(list)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params
            const pedido = await pedidos.findOne({
                where: {
                    id: id
                }
            })

            res.json(pedido)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async store(req, res) {
        try {
            const pedido = await pedidos.create({
                usuario_id: req.usuarioId,
                restaurante_id: req.body.restaurante_id,
                status: 'P', // Pendente
                valor_total: 0
            })

            res.json(pedido)

        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async update(req, res) {
        try {

        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async destroy(req, res) {
        try {

        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }
}