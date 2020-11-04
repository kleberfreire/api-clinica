const db = require('./connectDB')


const cliente = 'QAJqIM52KbcxV3cMrB8d'

const clienteRef = db.collection('cliente').doc(cliente)

const consultas = db
                    .collection('consulta')
                    .where('cliente','==', clienteRef)
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