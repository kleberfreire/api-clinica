const cliente = require('../models/clientes.model')


const index = async (req, res) => {
    const result = await cliente.findAll()   
    res.json(result)
}

const create = async (req, res) => {
    try {
        await cliente.create(req.body)
        console.log('usuario criado com sucesso')
        res.status(200).json({message: "usuario criado com sucesso"})
    } catch(err) {
        console.log('usuario não cadastrado')
        res.status(500).json(err)
    }
}

const findOne = async (req, res) => {
    try {
        const result = await cliente.findOne(req.params.id)
        res.status(200).json(result)
    } catch (erro) {
        console.log('usuario não encontrado')
        res.status(500).json(err)
    }
}

const remove = async (req, res) => {
    try {
        await cliente.remove(req.params.id)
        console.log('usuario removido com sucesso')
        res.status(200).json({message: "usuario removido com sucesso"})
    } catch(err) {
        console.log('usuario não deletado')
        res.status(500).json(err)
    }
}

const update = async (req, res) => {

    try {
        await cliente.update(req.params.id ,req.body)
        console.log('usuario alterado com sucesso')
        res.status(200).json({message: "usuario atualizado com sucesso"})
    } catch(err) {
        console.log('usuario não alterado')
        res.status(500).json(err)
    }

}


const paginated = async (req, res) => {
    const pageSize = parseInt(req.params.id)
    try {
        const result = await cliente.findAllPaginated({ pageSize: pageSize, startAfter: '' })
        console.log('numero de paginas',  1)
        res.status(200).json(result)
    } catch(err) {
        console.log('não há paginas')
        res.status(500).json(err)
    }

}



module.exports = {
    index,
    create,
    remove,
    update,
    findOne,
    paginated
}