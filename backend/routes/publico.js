const express = require('express')
const PublicoController = require('../controllers/PublicoController')
const UsuariosController = require('../controllers/UsuariosController')
const router = express.Router()

router.get('/', PublicoController.index)
router.post('/registrar', UsuariosController.store)
router.post('/login', UsuariosController.login)

module.exports = router