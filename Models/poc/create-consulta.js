const db = require('./connectDB')

const doc = db.collection('consulta').doc()

const cliente = 'QAJqIM52KbcxV3cMrB8d'

const clienteRef = db.collection('cliente').doc(cliente)

const medico = 'lLOXcRDHQjm9yVI7k4CV'

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