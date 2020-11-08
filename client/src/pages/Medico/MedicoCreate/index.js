import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../../Layout'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddressForm() {
  const classes = useStyles();
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="CRM"
            name="CRM"
            label="Digite seu CRM"
            fullWidth
            autoComplete="CRM"
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
          />
        </Grid>
        
        <Grid item xs={12}>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        cadastrar
      </Button>
        </Grid>
      </Grid>
    </React.Fragment>
    </Layout>
  );
}