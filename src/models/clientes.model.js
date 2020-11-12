const db = require('./connectDB')
const COLLECTION_NAME = 'cliente'

const findAll = async () => {
  const clientesDB = await db.collection(COLLECTION_NAME).get()
  if(clientesDB.empty) {
    return []
  }
  const clientes = []

  clientesDB.forEach(doc => {
    clientes.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return clientes
}

const findAllPaginated = async ({ pageSize = 10, startAfter = '' }) => {
  const clientesDB = await db
  .collection(COLLECTION_NAME)
  .orderBy('nome')
  .limit(pageSize + 1)
  .startAfter(startAfter)
  .get()
  
  if (clientesDB.empty) {
    return {
      data: [],
      total: 0
    }
  }
  
  const clientes = []
  let total = 0
  clientesDB.forEach(doc => {
    if(total < pageSize) {
      clientes.push({
        id: doc.id,
        ...doc.data()
      })
    }
      total++
    })
  
  return {
    data: clientes,
    total: clientes.length,
    hasNext: total > pageSize, 
    startAfter:total > pageSize ? clientes[clientes.length - 1].nome : ''
  }
}


const findOne = async(id) => {
  const clientesDB = await db.collection(COLLECTION_NAME).doc(id).get()
  console.log('cliente FindOne', clientesDB.data())
  return clientesDB.data()
}

const create =async(data) => {
  const clientesDB = await db.collection(COLLECTION_NAME).doc().set(data)
}


const update =async(id,data) => {
  const clientesDB = await db.collection(COLLECTION_NAME).doc(id).update(data)
}

const remove =async(id) => {
  const clientesDB = await db.collection(COLLECTION_NAME).doc(id).delete()
}

module.exports = {
  findAll,
  findOne,
  update,
  create,
  remove,
  findAllPaginated
}