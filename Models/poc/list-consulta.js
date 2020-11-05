const db = require('../connectDB')

const consultas = db.collection('consulta').get()



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