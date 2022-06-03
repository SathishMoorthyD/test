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
import { OperationRender } from '../operation-renderer/operation-render';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import * as _ from 'lodash'
import { Toolbar , TextField,IconButton,Typography} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dialog,DialogActions,DialogContentText,DialogContent,DialogTitle } from '@mui/material';

export const CustomTable = (props ) => {
  const {tableRowData,handleChange,tableColumnData,roledata,isPaginationVisible,AddLabel,onAddClick,open,handleClose,properties,values,handleSubmit} = props
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const filteredColumnFields = _.filter(tableColumnData, (item)=>item.field !== 'sl' && item.field !== 'Edit');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [showPassword, setShowPassword] = React.useState(false)
 
  const handleClickShowPassword = () => {
    console.log(showPassword)
   setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        justifyContent:'end'
      }}
    >
      
      <Button size="small" sx={{justifyContent:'flex-end',alignItems:'flex-end'}} className="btn btn-success rounded btn-sm" onClick={()=>onAddClick()}  variant="contained">{AddLabel || 'ADD'}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

      
                           
                <div class="p-2"><TextField  value={values?.email} id={properties.email}   label={properties.email}  size="small"   fullWidth  onChange={(e)=>handleChange(e.target.value,'email')} />   </div>
                <div class="p-2"> 
                <Autocomplete
        id={properties.role}
        size="small"
        options={roledata}
        getOptionLabel={(option) => option.Role}
        onChange={(event,newValue)=>handleChange(newValue.Role,'role')}
        renderInput={(params) => (
          <TextField
            {...params}
            
            label={properties.role}
           
          />
        )}
      />
                </div>
                <div class="p-2"><TextField value={values?.username} id={properties.username}   label={properties.username}  size="small"   fullWidth  onChange={(e)=>handleChange(e.target.value,'username')} />   </div>
                   
                    <div class="p-2"><TextField  value={values?.password} id={properties.password}   label={properties.password}  size="small"   fullWidth   type={showPassword ? 'text' : 'password'}
         InputProps={{
          endAdornment:  <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            // edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff /> }
          </IconButton>
        </InputAdornment>
        }}  onChange={(e)=>handleChange(e.target.value,'password')} />   </div>

                

          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button type="button" class="btn btn-warning rounded btn-sm  ml-2" onClick={handleClose}>Cancel</button>
         
          <button type="button" class="btn btn-warning rounded btn-sm  ml-2" onClick={handleSubmit}>Submit</button>
        </DialogActions>
      </Dialog>
      </Toolbar>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
        {/* {  tableColumnData[0].headerName && <TableCell>{tableColumnData[0]?.headerName}</TableCell>}
        */}
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
               {/* <TableCell >{index+1}</TableCell> */}
              
              {filteredColumnFields.map((columnField) => {
              
                const tableData = _.property(columnField.field)(row)
                return (
                  <>
                     <TableCell  key={columnField.id}>
                     {columnField.cellRenderer !== 'operationIconRenderer'&& tableData}
                    {columnField.cellRenderer === 'operationIconRenderer' &&
                    <OperationRender rowDetail={row}></OperationRender>
                   }
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
    {isPaginationVisible &&<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableRowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
        </Paper>
        
    </div>
   
  )
}
