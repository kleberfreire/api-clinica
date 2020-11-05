const db = require('./connectDB')

const doc = db.collection('consulta').doc('C6Sl0WwwYLlRVXEoEmI4')

const cliente = 'CiTPSsPr2duhjsfkaOSe'

const clienteRef = db.collection('cliente').doc(cliente)

const medico = 'qhSkdqgyUWmQ6nYLaQaU'

const medicoRef = db.collection('medico').doc(medico)


doc.update({
  Observacao: "jjjjjjjjj",
  cliente: clienteRef,
  data: "30/11/2020",
  hora: "09:00",
  medico: medicoRef
}).then(snap => {
  console.log(snap)
})