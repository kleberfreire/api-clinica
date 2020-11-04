const db = require('./connectDB')

const doc = db.collection('consulta').doc()

const cliente = 'CiTPSsPr2duhjsfkaOSe'

const clienteRef = db.collection('cliente').doc(cliente)

const medico = 'mtk64LYwF7pYL4TvlII86'

const medicoRef = db.collection('medico').doc(medico)


doc.set({
  Observacao: "kkkkkkkkkkk",
  cliente: clienteRef,
  data: "30/11/2020",
  hora: "09:00",
  medico: medicoRef
}).then(snap => {
  console.log(snap)
})