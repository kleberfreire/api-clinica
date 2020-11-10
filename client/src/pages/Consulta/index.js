import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import {Delete, Description, Search } from '@material-ui/icons/'

import api from '../../services/api'

import Layout from '../Layout'
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function AddressForm() {
  const [consultaList, setConsultaList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const getConsulta = await api.get('/api/consulta',)
      console.log('testesss', getConsulta.data) 
      if(getConsulta.status === 200) {
        await setConsultaList(getConsulta.data)
      } 

    }   
    
    fetchData()
    // console.log('medicos',medicoList)
    // console.log('cliente',clienteList)
  }, [])

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const classes = useStyles();

  return (
    <Layout titlePage="Consultas">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <Button variant="contained" color="primary" href="/consulta/create">
            Adicionar Consulta
        </Button>
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Cliente</TableCell>
                <TableCell align="left">Medico</TableCell>
                <TableCell align="left">Data</TableCell>
                <TableCell align="left">Hora</TableCell>
                <TableCell align="left">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultaList && consultaList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.cliente.nome}</TableCell>
                  <TableCell>{row.medico.nome}</TableCell>
                  <TableCell align="left">{row.data}</TableCell>
                  <TableCell align="left">{row.hora}</TableCell>
                  
                  <TableCell align="left">
                    <Link href="/"><Delete /></Link>
                    
                    <Link href="/consulta"><Description /></Link>
                    
                    <Link href="/consulta"><Search /></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>




      </Grid>
      </Grid>
    </React.Fragment>
    </Layout>
  );
}