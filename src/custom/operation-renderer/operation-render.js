/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {  TextField,IconButton,Typography} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dialog,DialogActions,DialogContentText,DialogContent,DialogTitle } from '@mui/material';
import { changePass, deleteUser } from '../../services/login/login.service';
import { ThemeConsumer } from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';

export  const OperationRender = (props) => {
    let navigate = useNavigate();
    const {rowDetail, fetchData} = props
    console.log(rowDetail)
    const [showPassword, setShowPassword] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const openMenu = Boolean(anchorEl)
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleClickShowPassword = () => {
      console.log(showPassword)
     setShowPassword(!showPassword)
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
   

    const [openResetPassword, setOpenResetPassword] = React.useState(false);
  
    const handleClickResetPasswordOpen = (data) => {
      setResetPasswordValues(data)
      setOpenResetPassword(true);
      handleMenuClose()
    };
  
    const handleResetPasswordClose = () => {
      setOpenResetPassword(false);
    };
    const [resetPasswordValues, setResetPasswordValues] = React.useState();
    const handleResetPasswordChange = (event,field) => {
      setResetPasswordValues({ ...resetPasswordValues, [field]: event });
    };
    const handleResetPasswordSubmit=(event )=>{
      event.preventDefault();
      console.log(resetPasswordValues)
      const responseData = changePass(resetPasswordValues);
      //console.log("operation-render reset password ", responseData);
      responseData.then(function(val){
      //console.log("operation-render reset password then", val);
      alert(val.data);
      if (val.status === 200)
      {
        handleResetPasswordClose();
        setResetPasswordValues();
        fetchData();
      }
      })
    }
    const [openDelete, setOpenDelete] = React.useState(false);
  
    const handleClickDeleteOpen = (data) => {
      console.log(data)
      setResetPasswordValues(data)
      setOpenDelete(true);
      handleMenuClose()
    };
  
    const handleDeleteClose = () => {
      setOpenDelete(false);
    };
    const handleDeleteSubmit=async (event )=>{
      event.preventDefault()
      console.log( resetPasswordValues)
      const responseData = deleteUser(resetPasswordValues.id);
      //console.log("operation-render delete user ", responseData);
      responseData.then(function(val){
      //console.log("operation-render delet user then", val);
      alert(val.data);
      if (val.status === 200)
      {
        handleDeleteClose()
        setResetPasswordValues()
        //showToasterSubject.next({type:'success',value:'User Master Added successfully'})
        fetchData();
      }
      })
    }
  return (
    <div>
<>
<IconButton
        aria-label="more"
        id="long-button"
       
        aria-haspopup="true"
       
      >
        <MoreVertIcon   onClick={handleMenuClick}/>
      </IconButton>
  
      <Menu
        id="long-menu"
       
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        // PaperProps={{
        //   style: {
        //     maxHeight: 48 * 4.5,
        //     width: '20ch',
        //   },
        // }}
      >
       
          <MenuItem onClick={()=>handleClickResetPasswordOpen(rowDetail)}>
            Reset Password
          </MenuItem>
          
          <MenuItem onClick={()=>handleClickDeleteOpen(rowDetail)}>
            Delete Account
          </MenuItem>
         
      </Menu>
    </>
    <Dialog
        open={openResetPassword}
        onClose={handleResetPasswordClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Reset Password
          <CloseIcon style={{float:'right'}} onClick={handleResetPasswordClose}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="h6"  component="div" style={{padding:5}}>
      UserName :  {resetPasswordValues?.username}
      </Typography>
      <Typography variant="h6"  component="div" style={{padding:5}}>
      Email :  {resetPasswordValues?.email}
      </Typography>
      <TextField
           placeholder='Password'
        //  id="outlined-size-small"
         fullWidth
         size="small"         
         style={{padding:10}}
         value={resetPasswordValues?.password}
         onChange={(e)=>handleResetPasswordChange(e.target.value,'password')}
         type={showPassword ? 'text' : 'password'}
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
        }}
         />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button type="button" class="btn btn-warning rounded btn-sm  ml-2" onClick={handleResetPasswordSubmit}>Submit</button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         Delete User
         
          <CloseIcon style={{float:'right'}} onClick={handleDeleteClose} />
     
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="caption"  component="div" style={{padding:2}}>
        
        After You Delete an Account,its permantenly Deleted.<br/>
        Account Can't be Undeleted
      </Typography>
      <Typography variant="h6"  component="div" style={{padding:5}}>
      userName : {resetPasswordValues?.username}
      </Typography>
      <Typography variant="h6"  component="div" style={{padding:5}}>
      Email :  {resetPasswordValues?.email}
      </Typography>
      
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button type="button" class="btn btn-danger rounded btn-sm  ml-2" onClick={handleDeleteSubmit}>Delete</button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
