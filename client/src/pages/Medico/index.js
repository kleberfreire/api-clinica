import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

import Layout from '../Layout'

export default function AddressForm() {
  return (
    <Layout titlePage="Medicos">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <Button variant="contained" color="primary" href="/medico/create">
          Adicionar medico
        </Button>
      </Typography>
      <Grid container spacing={3}>
        <h1>Lista Medicos</h1>
      </Grid>
    </React.Fragment>
    </Layout>
  );
}