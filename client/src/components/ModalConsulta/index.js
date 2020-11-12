import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import api from '../../services/api'



const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500], 
  },
});


const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});








const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);




export default function CustomizedDialogs({children, typeModal, id}) {
  const [open, setOpen] = React.useState(false);
  const [dataModal, setDataModal] = React.useState([])

  const spredData = async(data) => {
    return [{
      id: data.id,
      data: data.data,
      hora: data.hora,
      obsercacao: data.obsercacao
    },
    {...data.cliente},
    {...data.medico}
    ]
  }

  

  const fetchData = async () => {
    const getConsulta = await api.get(`/api/${typeModal}/findOne/${id}`)
    console.log(getConsulta)
    const resultSpred = await spredData(getConsulta.data)

    console.log(resultSpred)
    if(getConsulta.status === 200) {
      await setDataModal(resultSpred)
    } 

    console.log('modal', dataModal)
  }   

  const handleClickOpen = () => {
    setOpen(true);
    fetchData()
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link variant="outlined" color="primary" onClick={handleClickOpen}>
        {children}
      </Link>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Consulta
        </DialogTitle>
        <DialogContent dividers>
          <BasicTable rows={dataModal[0]}/>
          <h3>Medico</h3>
          <BasicTable rows={dataModal[1]}/>
          <h3>Cliente</h3>
          <BasicTable rows={dataModal[2]}/>
        </DialogContent>

      </Dialog>
    </div>
  );
}


export function BasicTable({rows}) {
  const classes = useStyles();
  console.log(rows)
  const headTable = rows ? Object.keys(rows).filter(item => item !== 'id') : []
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            headTable.map((headers) => (
                <TableRow key={headers}>
                  <TableCell align="left">{headers}</TableCell>
                  <TableCell align="left">{rows[headers]}</TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
