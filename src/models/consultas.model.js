const db = require('./connectDB')
const COLLECTION_NAME = 'consulta'

const findAll = async () => {
  const consultaDB = await db.collection(COLLECTION_NAME).get()
  if(consultaDB.empty) {
    return []
  }
  const consultas = []

  consultaDB.forEach(doc => {
    consultas.push({id: doc.id, ...doc.data()})
  })
  const consultaFilted = []
  for await (consulta of consultas) {

    const cliente = await consulta.cliente.get()
    const medico = await consulta.medico.get()
    const clienteAux = { id: cliente.id, ...cliente.data()}
    const medicoAux = { id: medico.id, ...medico.data()}
    consultaFilted.push({
      ...consulta,
      cliente: clienteAux,
      medico: medicoAux,
    })
  }



  return consultaFilted
}

const findAllPaginated = async ({ pageSize = 10, startAfter = '' }) => {
  const consultaDB = await db
  .collection(COLLECTION_NAME)
  .orderBy('nome')
  .limit(pageSize + 1)
  .startAfter(startAfter)
  .get()
  
  if (consultaDB.empty) {
    return {
      data: [],
      total: 0
    }
  }
  
  const consultas = []
  const consultaFilted = []
  let total = 0
  consultaDB.forEach(doc => {
    if(total < pageSize) {
      consultas.push({
        id: doc.id,
        ...doc.data()
      })
      
        // for await (consulta of consultas) {

        //   const cliente = await consulta.cliente.get()
        //   const medico = await consulta.medico.get()
        //   const clienteAux = { ...cliente.data()}
        //   const medicoAux = {...medico.data()}
        //   consultaFilted.push({
        //     ...consulta,
        //     cliente: clienteAux,
        //     medico: medicoAux,

        //   })
        // }
    }
      total++
    })
  
  return {
    data: consultaFilted,
    total: consultaFilted.length,
    hasNext: total > pageSize, 
    startAfter:total > pageSize ? consultaFilted[consultaFilted.length - 1].nome : ''
  }
}


const findOne = async(id) => {
  const consultaDB = await db.collection(COLLECTION_NAME).doc(id).get()
  // console.log(consultaDB.data())
  
  if(consultaDB.empty) {
    return []
  }


  const cliente = await consultaDB.data().cliente.get()
  
  const medico = await consultaDB.data().medico.get()
  const clienteAux = { id: cliente.id, ...cliente.data()}
  const medicoAux = { id: medico.id, ...medico.data()}
  
  const consultaAllData = {
    id: consultaDB.id,
    ...consultaDB.data(),
    cliente: clienteAux,
    medico: medicoAux,
  }

  return consultaAllData

}

const create =async({cliente, medico, ...data}) => {
 
  const clienteRef = db.collection('cliente').doc(cliente)
  
  const medicoRef = db.collection('medico').doc(medico)

  const consulta = {cliente: clienteRef, medico: medicoRef, ...data}

  await db.collection(COLLECTION_NAME).doc().set(consulta)
}


const update =async(id, {cliente, medico, ...data}) => {
  const clienteRef = db.collection('cliente').doc(cliente)
  
  const medicoRef = db.collection('medico').doc(medico)

  const consulta = {cliente: clienteRef, medico: medicoRef, ...data}

  await db.collection(COLLECTION_NAME).doc(id).update(consulta)
}

const remove =async(id) => {
  const consultaDB = await db.collection(COLLECTION_NAME).doc(id).delete()
}

module.exports = {
  findAll,
  findOne,
  update,
  create,
  remove,
  findAllPaginated
}