const { 
    pedidos, 
    pedidos_produtos, 
    produtos 
} = require('../models')

module.exports = class PedidosController {
    static async index(req, res) {
        try {
            const list = await pedidos.findAll({
                where: {
                    usuario_id: req.usuarioId
                },
                include: 'restaurante'
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
                },
                include: 'produtos'
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
            const { id } = req.params
            const pedido = await pedidos.findOne({
                where: {
                    id: id,
                    usuario_id: req.usuarioId
                }
            })
            
            await pedido.update({
                usuario_id: req.usuarioId,
                restaurante_id: pedido.restaurante_id,
                status: 'S', // Separação
                valor_total: pedido.valor_total
            })

            res.json(pedido)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params
            const pedido = await pedidos.findOne({
                where: {
                    id: id,
                    usuario_id: req.usuarioId
                }
            })
            await pedido.update({
                usuario_id: req.usuarioId,
                restaurante_id: pedido.restaurante_id,
                status: 'C', // Cancelado
                valor_total: pedido.valor_total
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

    static async addProduto(req, res) {
        try {
            const { id, produto_id } = req.params
            const produto = await produtos.findOne({
                where: { id: produto_id }
            })

            const valorTotal = produto.valor * req.body.quantidade
            const pedido_produto = await pedidos_produtos.create({
                pedido_id: id,
                produto_id: produto_id,
                quantidade: req.body.quantidade,
                valor: valorTotal
            })

            const pedido = await pedidos.findOne({
                where: { id: id },
                include: 'produtos'
            })

            await pedido.update({
                valor_total: Number(pedido.valor_total) + Number(valorTotal)
            })

            const pedido2 = await pedidos.findOne({
                where: { id: id },
                include: 'produtos'
            })

            res.json(pedido2)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async destroyProduto(req, res) {
        try {
            const { produto_id, id } = req.params
            await pedidos_produtos.destroy({
                where: {
                    produto_id: produto_id,
                    pedido_id: id
                }
            })

            pedidos.calculaValorTotal(id)

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