const express = require('express')
const routerPublico = require('./routes/publico')
const routerPrivado = require('./routes/privado')
const UsuariosController = require('./controllers/UsuariosController')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routerPublico)
app.use('/', UsuariosController.validaToken, routerPrivado)

app.listen(3000, () => {
    console.log(`Servidor foi iniciado`)
})