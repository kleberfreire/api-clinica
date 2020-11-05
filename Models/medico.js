const db = require('./connectDB')
const COLLECTION_NAME = 'medico'

const findAll = async () => {
  const medicoDB = await db.collection(COLLECTION_NAME).get()
  if(medicoDB.empty) {
    return []
  }
  const medico = []

  medicoDB.forEach(doc => {
    medico.push({
      id: doc.id,
      ...doc.data()
    })
  })
}


const findOne = async(id) => {
  const medicoDB = await db.collection(COLLECTION_NAME).doc(id).get()
  console.log(medicoDB.data())
  return medicoDB.data()
}

const findAllPaginated = async ({ pageSize = 10, startAfter = '' }) => {
  const medicoDB = await db
  .collection(COLLECTION_NAME)
  .orderBy('nome')
  .limit(pageSize + 1)
  .startAfter(startAfter)
  .get()
  
  if (medicoDB.empty) {
    return {
      data: [],
      total: 0
    }
  }
  
  const medicos = []
  let total = 0
  medicoDB.forEach(doc => {
    if(total < pageSize) {
      medicos.push({
        id: doc.id,
        ...doc.data()
      })
    }
      total++
    })
  
  return {
    data: medicos,
    total: medicos.length,
    hasNext: total > pageSize, 
    startAfter:total > pageSize ? medicos[medicos.length - 1].nome : ''
  }
}


const create =async(data) => {
  const medicoDB = await db.collection(COLLECTION_NAME).doc().set(data)
}


const update =async(id,data) => {
  const medicoDB = await db.collection(COLLECTION_NAME).doc(id).update(data)
}

const remove =async(id) => {
  const medicoDB = await db.collection(COLLECTION_NAME).doc(id).delete()
}

module.exports = {
  findAll,
  findOne,
  update,
  create,
  remove,
  findAllPaginated

}

