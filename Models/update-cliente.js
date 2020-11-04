const db = require('./connectDB')

const doc = db.collection('cliente').doc('QAJqIM52KbcxV3cMrB8d')

doc.update({
  nome: "teste11212",
  email :"teste1@gmail.com",
  telefone: "61984333467"
}).then(snap => {
  console.log(snap)
})