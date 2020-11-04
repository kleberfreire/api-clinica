const db = require('./connectDB')

const medicos = db.collection('medico').get()



medicos.then(snap => {
  snap.forEach(doc => console.log(doc.id,'=>' ,doc.data().nome))
})