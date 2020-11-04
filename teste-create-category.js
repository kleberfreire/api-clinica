const db = require('./Models/connectDB')

const doc = db.collection('cliente').doc()

doc.set({
  nome: "teste1",
  email :"teste1@gmail.com",
  telefone: "61984333467"
}).then(snap => {
  console.log(snap)
})