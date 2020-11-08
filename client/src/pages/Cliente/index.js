import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

import Layout from '../Layout'

export default function AddressForm() {
  return (
    <Layout titlePage="Cliente">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Adicionar cliente
      </Typography>
      <Grid container spacing={3}>
        <h1>Lista Clientes</h1>
      </Grid>
    </React.Fragment>
    </Layout>
  );
}