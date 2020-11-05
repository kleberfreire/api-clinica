const db = require('./connectDB')

const doc = db.collection('cliente').doc('QAJqIM52KbcxV3cMrB8d')

doc.delete().then(snap => {
  console.log(snap)
})