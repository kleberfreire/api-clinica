const db = require('./connectDB')

const doc = db.collection('medico').doc()

doc.set({
  nome:"joaquim",
  especialidade:"urologista",
  CRM: 0012154,

}).then(snap => {
  console.log(snap)
})