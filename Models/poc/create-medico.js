const db = require('./connectDB')

const doc = db.collection('medico').doc()

doc.set({
  nome:"Luiz",
  especialidade:"cardiologista",
  CRM: 00000,

}).then(snap => {
  console.log(snap)
})