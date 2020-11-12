import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'

import api from '../../../services/api'

import Layout from '../../Layout'



const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddressForm() {
  const classes = useStyles();
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/api/clientes/findOne/${id}`)
      await setNome(result.data.nome)
      await setEmail(result.data.email)
      await setTelefone(result.data.telefone)
    }

    fetchData()
  }, [])



  const handleSubmit = async() => {
    const data = {
      nome: nome,
      email: email,
      telefone: telefone,
    }
    const response = await api.post('/api/clientes',data) 

    if(response.status === 200) {
      window.location.href='/cliente'
    } else {
      alert('Erro ao cadastrar o cliente')
    }
  }


  return (
    <Layout titlePage="Cliente">
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Fomulario de cadastro de cliente
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
            id="email"
            name="email"
            label="Digite seu email"
            fullWidth
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="telefone"
            name="telefone"
            label="Digite seu telefone"
            fullWidth
            autoComplete="phone"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
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