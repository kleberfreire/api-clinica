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

import Modal from '../../components/Modal'
import ModalConsulta from '../../components/ModalConsulta'
import filterConsultasForDay from '../../functions/filterConsultasForDay'
import countMedicosForDay from '../../functions/countMedicoForDay'

import BarChart from '../../components/BarChart'

import {Delete, Description, Search} from '@material-ui/icons/'

import api from '../../services/api'

import Layout from '../Layout'
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  chart: {
    width: '100%'
  }
});


export default function AddressForm() {
  const [consultaList, setConsultaList] = useState([])
  const [medicosCharts, setMedicosCharts] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      const getConsulta = await api.get('/api/consulta/findData',)
      if(getConsulta.status === 200) {
        const resultForData = await filterConsultasForDay(getConsulta.data)
        const resultForMedicos = await countMedicosForDay(resultForData)
        await setMedicosCharts(resultForMedicos)
        console.log(resultForData)
        await setConsultaList(resultForData.reverse())
      } 
    }   

    
    
    fetchData()
    
  }, [])

  const remove = async (id) => {
    console.log(id)
    const response = await api.delete('/api/consulta/'+id ) 
    if(response.status === 200) {
      window.location.href='/consulta'
      console.log('deletado com sucesso')
    } else {
      alert('Erro ao excluir o consulta')
    }
  }


  const classes = useStyles();

  return (
    <Layout titlePage="Consultas da Semana">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <Button variant="contained" color="primary" href="/consulta/create">
            Adicionar Consulta
        </Button>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        {consultaList && consultaList.map((tabela, index) => (
          <>
        <Typography variant="h6" gutterBottom>
         Consultas  {tabela.date}
        </Typography>
          <TableContainer component={Paper}>
          
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Cliente</TableCell>
                  <TableCell align="left">Medico</TableCell>
                  <TableCell align="left">Data</TableCell>
                  <TableCell align="left">Hora</TableCell>
                  <TableCell align="left">Observação</TableCell>
                  <TableCell align="left">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { tabela.consultas && tabela.consultas.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left"><Modal typeModal={'clientes'} id={row.cliente.id}> {row.cliente.nome} </Modal></TableCell>
                    <TableCell><Modal typeModal={'medicos'} id={row.medico.id}> {row.medico.nome} </Modal></TableCell>
                    <TableCell align="left">{row.data}</TableCell>
                    <TableCell align="left">{row.hora}</TableCell>
                    <TableCell align="left">{row.observacao}</TableCell>
                    <TableCell align="left">
                      <Link component="a" onClick={() => {
                        remove(row.id)
                      }}><Delete /></Link>
                      
                      <Link  href={'/consulta/update/' + row.id}><Description /></Link>
                      
                      <ModalConsulta typeModal={'consulta'} id={row.id}><Search/> </ModalConsulta>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          </>
        ))}
        
      
        </Grid>
                    
        <Grid item xs={12} className={classes.chartContainer}>
        
        <BarChart  className={classes.chart} dataMedico={medicosCharts}/>
        
        </Grid>

      </Grid>
    </React.Fragment>
    </Layout>
  );
}