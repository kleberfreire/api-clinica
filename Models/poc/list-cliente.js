const db = require('./connectDB')

const clientes = db.collection('cliente').get()



clientes.then(snap => {
  snap.forEach(doc => console.log(doc.id,'=>' ,doc.data().nome))
})