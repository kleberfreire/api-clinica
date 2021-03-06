const medico = require('../models/medicos.model')


const index = async (req, res) => {
    const result = await medico.findAll()   
    res.json(result)
}

const create = async (req, res) => {
    try {
        await medico.create(req.body)
        console.log('usuario criado com sucesso')
        res.status(200).redirect('/api/medicos')
    } catch(err) {
        console.log('usuario não cadastrado')
        res.status(500).json(err)
    }
}

const findOne = async (req, res) => {
    try {
        const result = await medico.findOne(req.params.id)
        res.status(200).json(result)
    } catch (erro) {
        console.log('usuario não encontrado')
        res.status(500).json(err)
    }

}

const remove = async (req, res) => {
    try {
        await medico.remove(req.params.id)
        console.log('usuario removido com sucesso')
        res.status(200).json({message: "medico remove com sucesso"})
    } catch(err) {
        console.log('usuario não deletado')
        res.status(500).json(err)
    }
}

const update = async (req, res) => {

    try {
        await medico.update(req.params.id ,req.body)
        console.log('usuario alterado com sucesso')
        res.status(200).redirect('/api/medicos')
    } catch(err) {
        console.log('usuario não alterado')
        res.status(500).json(err)
    }

}


const paginated = async (req, res) => {
    const pageSize = parseInt(req.params.id)
    try {
        const result = await medico.findAllPaginated({ pageSize: pageSize, startAfter: '' })
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