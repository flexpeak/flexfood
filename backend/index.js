const express = require('express')
const routerPublico = require('./routes/publico')
const routerPrivado = require('./routes/privado')
const UsuariosController = require('./controllers/UsuariosController')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', routerPublico)
app.use('/', UsuariosController.validaToken, routerPrivado)

app.listen(process.env.PORT, () => {
    console.log(`Servidor foi iniciado`)
})