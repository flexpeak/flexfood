const { restaurantes, usuarios } = require('../models')

module.exports = class RestaurantesController {
    static async index(req, res) {
        try {
            if (req.usuarioTipo == 'C') {
                const lista = await restaurantes.findAll({
                    include: {
                        model: usuarios,
                        as: 'usuario',
                        attributes: ['nome']
                    }
                })
                res.json(lista)
            } else {
                const lista = await restaurantes.findOne({
                    where: {
                        usuario_id: req.usuarioId
                    }
                })
                res.json(lista)
            }

        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async store(req, res) {
        try {
            const restaurante = await restaurantes.create({
                nome: req.body.nome,
                logo: '/uploads/' + req.file.filename,
                status: 'A',
                usuario_id: req.usuarioId
            })

            res.json(restaurante)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const restaurante = await restaurantes.findOne({
                where: {
                    id: id,
                    usuario_id: req.usuarioId
                }
            })

            await restaurante.update({
                nome: req.body.nome,
                logo: req.file ? '/uploads/' + req.file.filename : restaurante.logo,
                status: req.body.status,
                usuario_id: restaurante.usuario_id
            })

            res.json(restaurante)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params
            const restaurante = await restaurantes.findOne({
                where: {
                    id: id,
                    usuario_id: req.usuarioId
                }
            })

            await restaurante.destroy()

            res.json({
                success: true
            })
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params
            const restaurante = await restaurantes.findOne({
                where: {
                    id: id
                },
                include: 'produtos'
            })

            res.json(restaurante)
        } catch (e) {
            res.status(500).json({
                error: e.message
            })
        }
    }
}