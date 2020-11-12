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

import {Delete, Description, Search} from '@material-ui/icons/'

import api from '../../services/api'

import Layout from '../Layout'
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function AddressForm() {
  const [clienteList, setConsultaList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const getCliente = await api.get('/api/clientes',)
      if(getCliente.status === 200) {
        await setConsultaList(getCliente.data)
      } 
    }   
    
    fetchData()
    
  }, [])

  const remove = async (id) => {
    console.log(id)
    const response = await api.delete('/api/clientes/'+id ) 
    if(response.status === 200) {
      window.location.href='/cliente'
      console.log('deletado com sucesso')
    } else {
      alert('Erro ao excluir o cliente')
    }
  }


  const classes = useStyles();

  return (
    <Layout titlePage="Clientes">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <Button variant="contained" color="primary" href="/cliente/create">
            Adicionar cliente
        </Button>
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">E-mail</TableCell>
                <TableCell align="left">Telefone</TableCell>
                <TableCell align="left">Ações</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {clienteList && clienteList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left"><Modal typeModal={'clientes'} id={row.id}> {row.nome} </Modal></TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.telefone}</TableCell>
                  <TableCell align="left">
                    <Link component="a" onClick={() => {
                      remove(row.id)
                    }}><Delete /></Link>
                    
                    <Link  href={'/cliente/update/' + row.id}><Description /></Link>
                    
                    <Modal typeModal={'clientes'} id={row.id}><Search/> </Modal>
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