const db = require('./connectDB')


const medico = 'qhSkdqgyUWmQ6nYLaQaU'

const medicoRef = db.collection('medico').doc(medico)

const consultas = db
                    .collection('consulta')
                    .where('medico', '==', medicoRef)
                    .get()
consultas.then(snap => {
  snap.forEach(doc => {
    console.log( doc.id, '=>', doc.data())
    doc.data().cliente.get()
      .then(clientSnapShot => {
      console.log('id:', clientSnapShot.id,'cliente ====', clientSnapShot.data())
    })
    doc.data().medico.get()
    .then(medicoSnapShot => {
    console.log('id:', medicoSnapShot.id, 'medico ====', medicoSnapShot.data())
  })

   })
})