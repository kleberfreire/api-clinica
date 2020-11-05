const cliente = require('../models/clientes.model')


const index = async (req, res) => {
    const result = await cliente.findAll()   
    res.json(result)
}

const create = async (req, res) => {
    const data = req.body;
    console.log(data)
    const result = await cliente.findAll()
    
    res.json(result)
}

const findOne = async (req, res) => {
    const result = await cliente.findAll()
    
    res.json(result)
}

const remove = async (req, res) => {
    const result = await cliente.findAll()
    
    res.json(result)
}

const update = async (req, res) => {
    const result = await cliente.findAll()
    
    res.json(result)
}


module.exports = {
    index,
    create,
    remove,
    update,
    findOne
}