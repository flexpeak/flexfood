const { produtos_favoritos } = require("../models")

module.exports = class ProdutosFavoritosController {
    static async index(req, res) {
        try {
            const list = await produtos_favoritos.findAll({
                include: 'produto',
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

    static async store(req, res) {
        try {
            const { produto_id } = req.body

            await produtos_favoritos.create({
                produto_id: produto_id,
                usuario_id: req.usuarioId
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

    static async destroy(req, res) {
        try {
            const produtoFavorito = await produtos_favoritos.findOne({
                where: {
                    usuario_id: req.usuarioId,
                    produto_id: req.body.produto_id
                }
            })

            await produtoFavorito.destroy()

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