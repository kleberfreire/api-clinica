import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import api from '../../../services/api'
import { formateDateBR } from '../../../functions/formatDate'

import Layout from '../../Layout'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 300,
  },
  textField: {
    width: 300,
  },

}));




export default function AddressForm() {
  const [selectCliente, setSelectCliente] = useState('');
  const [selectMedico, setSelectMedico] = useState('');
  
  const [observacao, setObservacao] = useState('')
  const [date, setDate] = useState('')
  const [hora, setHora] = useState('')

  const [medicoList, setMedicoList] = useState([])
  const [clienteList, setClienteList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const getMedicos = await api.get('/api/medicos',)
      const getCliente = await api.get('/api/clientes',)
      console.log('teste', getCliente.data)
      if(getMedicos.status === 200) {
       await setMedicoList(getMedicos.data)
      } 

      if(getCliente.status === 200) {
       await setClienteList(getCliente.data)
      } 
    }   
    
    fetchData()
    console.log('medicos',medicoList)
    console.log('cliente',clienteList)
  }, [])

  const handleSubmit = async() => {
    const data = {
      medico: selectMedico,
      cliente: selectCliente,
      observacao: observacao,
      data: formateDateBR(date),
      hora: hora
    }
    const response = await api.post('/api/consulta',data) 

    if(response.status === 200) {
      window.location.href='/consulta'
    } else {
      alert('Erro ao cadastrar o consulta')
    }
  }


  const handleChange = (setStateSelect) => (event) => {
    setStateSelect(event.target.value);
  };

  const classes = useStyles();
  return (
    <Layout titlePage="Consultas">
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Fomulario de cadastro de consulta
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="Obeservacao"
            name="Obeservacao"
            label="Digite alguma observação"
            fullWidth
            autoComplete="Obeservacao"
            value={observacao}
            onChange={e => setObservacao(e.target.value)}
          />
        </Grid>
        
          <Grid item xs={12} sm={6}>
              <TextField
              id="date"
              label="Data da consulta"
              type="date"
              defaultValue=""
              className={classes.textField}
              value={date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setDate(e.target.value)}
            />
          </Grid>
       
          <Grid item xs={12} sm={6}>
            <TextField
              id="time"
              label="Alarm clock"
              type="time"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={hora}
              onChange={e => setHora(e.target.value)}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
        
        <Grid item xs={12} sm={6}>

          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Cliente</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectCliente}
              onChange={handleChange(setSelectCliente)}
            >
              <MenuItem value="">
                <em>None Cliente</em>
              </MenuItem>
              {
                clienteList && clienteList.map((item,index) => (
                  <MenuItem value={item.id} key={index}>{item.nome}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Medico</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selectMedico}
            onChange={handleChange(setSelectMedico)}
          >
            <MenuItem value="">
              <em>None do medico</em>
            </MenuItem>
            
            {
              medicoList && medicoList.map((item,index) => (
                <MenuItem value={item.id} key={index}>{item.nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
        



        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            cadastrar
            
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
    </Layout>
  );
}