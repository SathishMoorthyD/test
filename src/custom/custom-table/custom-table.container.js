import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import * as _ from 'lodash'
import { Toolbar , Typography} from '@mui/material';

export const CustomTable = (props ) => {
  const {tableRowData,tableColumnData,onEditClick,AddLabel,onAddClick} = props
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const filteredColumnFields = _.filter(tableColumnData, (item)=>item.field !== 'sl' && item.field !== 'Edit');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (

    <div style={{display:'flex',padding:6,flexDirection:'column',background:'#a3e6d7',overflow:'auto',boxShadow:'0px 7px 12px rgba(233,233,233,0.35)'}}>

      <Paper sx={{ width: '100%',  mb: 2 }}>
      <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
      
      <Button size="small" sx={{justifyContent:'flex-end',alignItems:'flex-end'}} onClick={()=>onAddClick()}  variant="contained">{AddLabel || 'ADD'}</Button>

      </Toolbar>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
        {  tableColumnData[0].headerName && <TableCell>{tableColumnData[0]?.headerName}</TableCell>}
        {  tableColumnData[1].headerName && <TableCell>{tableColumnData[1]?.headerName}</TableCell>}
          {filteredColumnFields.map((columnField) => (
            <TableCell>{columnField.headerName}</TableCell>
          )
          )
}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRowData.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell >{index+1}</TableCell>
               {  tableColumnData[1].headerName && <TableCell><Button color="primary">
  <EditIcon onClick={()=>onEditClick(row)}></EditIcon>
</Button></TableCell>}
              {filteredColumnFields.map((columnField) => {
                const tableData = _.property(columnField.field)(row)
                return (
                  <>
                     <TableCell  key={columnField.id}>
                     { tableData}
                    
                  </TableCell>
                 
                  </>
                )
}
              
              )
                }
             
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableRowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>

    </div>
   
  )
}
