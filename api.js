const cliente = require('./Models/clientes');
const medico = require('./Models/medico');
const clinica = require('./Models/consultas')

const teste = async() => {
  
  const teste = await clinica.findAll()  
  console.log('teste => ', teste)
  //  await clinica.update('LXkmeay5XcFJLzrt2nNw', {
  //   hora: '23:00',
  //   Obsevacao: 'ta quase la indo mesmo',
  //   data: '23/01/84',
  //   medico: 'lLOXcRDHQjm9yVI7k4CV',  
  //   cliente: 'CiTPSsPr2duhjsfkaOSe'
  //  })

  // const cls = await cliente.findAllPaginated({pageSize: 1, startAfter: 'teste1'})
  // console.log(cls)

}

teste()