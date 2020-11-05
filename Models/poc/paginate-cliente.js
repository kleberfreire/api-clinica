const db = require('./connectDB')

const pageSize = 1

const clientes = db
                  .collection('cliente')
                  .orderBy('nome')
                  .limit(pageSize + 1)
                  .startAfter('teste')
                  .get()


clientes.then(snap => {
  let total = 0
  snap.forEach(doc => {
    if(total < pageSize) {
      console.log(doc.id,'=>' ,doc.data().nome)
    }
    total++
  })
  if(total > pageSize) {
    console.log('hasNext')
  }
})