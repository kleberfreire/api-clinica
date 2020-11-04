const db = require('./connectDB')

const doc = db.collection('medico').doc('qhSkdqgyUWmQ6nYLaQaU')

doc.delete().then(snap => {
  console.log(snap)
})