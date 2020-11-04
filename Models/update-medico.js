const db = require('./connectDB')

const doc = db.collection('medico').doc('qhSkdqgyUWmQ6nYLaQaU')

doc.update({
  nome:"Luiz Medeiros",
  especialidade:"cardiologista",
  CRM: 2156465,
}).then(snap => {
  console.log(snap)
})