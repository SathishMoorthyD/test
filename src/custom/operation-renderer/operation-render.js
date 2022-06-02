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

export  const OperationRender = (props) => {
    const {rowDetail} = props
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
    const handleResetPasswordSubmit=async (event )=>{
      event.preventDefault();
      console.log(resetPasswordValues)
      //  await saveUserMaster(resetPasswordValues)
      handleResetPasswordClose()
      setResetPasswordValues()
      // showToasterSubject.next({type:'success',value:'User Master Added successfully'})
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
      //  await saveUserMaster(resetPasswordValues)
      handleDeleteClose()
      setResetPasswordValues()
      // showToasterSubject.next({type:'success',value:'User Master Added successfully'})
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
      UserName :  {resetPasswordValues?.userName}
      </Typography>
      <Typography variant="h6"  component="div" style={{padding:5}}>
      Email :  {resetPasswordValues?.Email}
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
        Account Can't be Deleted
      </Typography>
      <Typography variant="h6"  component="div" style={{padding:5}}>
      userName : {resetPasswordValues?.userName}
      </Typography>
      <Typography variant="h6"  component="div" style={{padding:5}}>
      Email :  {resetPasswordValues?.Email}
      </Typography>
      
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button type="button" class="btn btn-warning rounded btn-sm  ml-2" onClick={handleDeleteSubmit}>Submit</button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
