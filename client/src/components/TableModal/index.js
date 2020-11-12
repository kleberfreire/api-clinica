import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function BasicTable({rows}) {
  const classes = useStyles();
  const headTable = rows ? Object.keys(rows) : []
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
