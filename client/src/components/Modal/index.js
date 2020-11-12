import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

import api from '../../services/api'

import TableModal from '../TableModal'

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

  const fetchData = async () => {
    const getConsulta = await api.get(`/api/${typeModal}/findOne/${id}`)
    
    if(getConsulta.status === 200) {
      await setDataModal(getConsulta.data)
    } 
    console.log(dataModal)
  }   

  const handleClickOpen = () => {
    setOpen(true);
    fetchData()
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link variant="outlined" color="primary" onClick={handleClickOpen}>
        {children}
      </Link>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div>{typeModal}</div>
        </DialogTitle>
        <DialogContent dividers>
          <TableModal rows={dataModal}/> 
        </DialogContent>

      </Dialog>
    </>
  );
}
