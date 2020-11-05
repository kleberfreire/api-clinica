const express = require('express')

const routes = express.Router();

const clienteController = require('./controllers/cliente.controllers')

routes.get('/', (req, res) => {
    res.json({message: "Seja bem vindo route"})
} )

routes.get('/clientes', clienteController.index)
routes.post('/clientes/new', clienteController.create)

module.exports = routes