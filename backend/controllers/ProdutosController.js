const { produtos, restaurantes } = require('../models')

module.exports = class ProdutosController {
    static async index(req, res) {
        try {
            const lista = await produtos.findAll({
                where: {
                    restaurante_id: req.restauranteId
                }
            })

            res.json(lista)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async store(req, res) {
        try {
            const produto = await produtos.create({
                nome: req.body.nome,
                valor: req.body.valor,
                foto: '/uploads/' + req.file.filename,
                restaurante_id: req.restauranteId,
                descricao: req.body.descricao,
                quantidade_estoque: req.body.quantidade_estoque
            })

            res.json(produto)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const produto = await produtos.findOne({
                where: {
                    id: id,
                    restaurante_id: req.restauranteId
                }
            })

            await produto.update({
                nome: req.body.nome,
                valor: req.body.valor,
                foto: req.file ? '/uploads/' + req.file.filename : produto.foto,
                restaurante_id: req.restauranteId,
                descricao: req.body.descricao,
                quantidade_estoque: req.body.quantidade_estoque
            })

            res.json(produto)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params
            const produto = await produtos.findOne({
                where: {
                    id: id
                }
            })

            res.json(produto)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params
            const produto = await produtos.findOne({
                where: {
                    id: id,
                    restaurante_id: req.restauranteId
                }
            })

            await produto.destroy()

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