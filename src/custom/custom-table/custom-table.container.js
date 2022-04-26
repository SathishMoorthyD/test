import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as _ from 'lodash'

export const CustomTable = (props ) => {
  const {tableRowData,tableColumnData} = props
  
  const filteredColumnFields = _.filter(tableColumnData, (item)=>item.field !== 'sl' && item.field !== 'Edit');

  return (

    <div style={{display:'flex',padding:6,flexDirection:'column',background:'#a3e6d7',overflow:'auto',boxShadow:'0px 7px 12px rgba(233,233,233,0.35)'}}>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
        {  tableColumnData[0].headerName && <TableCell>{tableColumnData[0]?.headerName}</TableCell>}
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
              {filteredColumnFields.map((columnField) => {
                const tableData = _.property(columnField.field)(row)
                return (
                  <>
                  <TableCell  key={columnField.id}>
                  {tableData}
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

    </div>
   
  )
}
