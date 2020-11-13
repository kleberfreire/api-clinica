const express = require('express')

const routes = express.Router();

const clienteController = require('./controllers/cliente.controller')
const medicoController = require('./controllers/medico.controller')
const consultaController = require('./controllers/consulta.controller')


routes.get('/', (req, res) => {
    res.json({message: "Seja bem vindo route"})
} )

routes.get('/api/clientes', clienteController.index)
routes.post('/api/clientes', clienteController.create)
routes.get('/api/clientes/findOne/:id', clienteController.findOne)
routes.delete('/api/clientes/:id', clienteController.remove)
routes.post('/api/clientes/update/:id', clienteController.update)
routes.get('/api/clientes/pagina/:id', clienteController.paginated)

routes.get('/api/medicos', medicoController.index)
routes.post('/api/medicos', medicoController.create)
routes.get('/api/medicos/findOne/:id', medicoController.findOne)
routes.delete('/api/medicos/:id', medicoController.remove)
routes.post('/api/medicos/update/:id', medicoController.update)
routes.get('/api/medicos/pagina/:id', medicoController.paginated)

routes.get('/api/consulta', consultaController.index)
routes.post('/api/consulta', consultaController.create)
routes.get('/api/consulta/findOne/:id', consultaController.findOne)
routes.delete('/api/consulta/:id', consultaController.remove)
routes.post('/api/consulta/update/:id', consultaController.update)


module.exports = routes