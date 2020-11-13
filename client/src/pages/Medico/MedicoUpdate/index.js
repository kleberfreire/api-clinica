import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useParams } from 'react-router-dom'

import Layout from '../../Layout'

import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddressForm() {
  const classes = useStyles();
  const [nome, setNome] = useState('')
  const [CRM, setCRM] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/api/medicos/findOne/${id}`)
      await setNome(result.data.nome)
      await setCRM(result.data.CRM)
      await setEspecialidade(result.data.especialidade)
    }

    fetchData()
  }, [id])

  const handleSubmit = async() => {
    const data = {
      CRM:CRM,
      especialidade:especialidade,
      nome: nome
    }
    const response = await api.post('/api/medicos/update/' + id ,data) 

    if(response.status === 200) {
      window.location.href='/medico'
    } else {
      alert('Erro ao cadastrar o medico')
    }
  }

  return (
    <Layout titlePage="Medico">
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Fomulario de cadastro de medico
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="nome"
            name="nome"
            label="Digite o seu nome completo"
            fullWidth
            autoComplete="name"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="CRM"
            name="CRM"
            label="Digite seu CRM"
            fullWidth
            autoComplete="CRM"
            value={CRM}
            onChange={e => setCRM(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="especialidade"
            name="especialidade"
            label="Digite sua especialidade"
            fullWidth
            autoComplete="especialidade"
            value={especialidade}
            onChange={e => setEspecialidade(e.target.value)}
          />
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