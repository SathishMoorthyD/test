import React,{useEffect, useState} from 'react'
import {Card,CardContent,Button,Grid,TextField,IconButton,Typography, Hidden, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form } from 'react-bootstrap'
import '../../App.css';
import { login } from '../../services/login/login.service';
import { showToasterSubject } from '../../services/toastr/toaster.service';
import {useNavigate} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { ThemeConsumer } from 'styled-components';

export const Login = () => {
  let navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({
    username: '',
    password: '',
    active : true,
  });

  const handleForgotPass = () => {setOpenDialog(!openDialog)};

  const handleChange = (event,field) => {
    setValues({ ...values, [field]: event });
  };
  const handleClickShowPassword = () => {
    console.log(showPassword)
   setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit= (event )=>{
    event.preventDefault();
    const val = login(values)
    val.then(function (resUserData){
    //console.log(resUserData);
    localStorage.setItem('AccessToken',resUserData.token)
    localStorage.setItem('Role',resUserData.role)
    localStorage.setItem('UserId',((resUserData.userid || resUserData.userid !== undefined)?resUserData.userid:values.username));
    showToasterSubject.next({type:'success',value:'login successfully'})
    
    window.location.reload();
    navigate(getNavLink(localStorage.getItem('Role')));
    })
  }

  const getNavLink = (userRole) => {return (userRole === 'admin')? '/UserMaster': '/dashboard';}

  useEffect(()=>{if (localStorage.getItem('AccessToken')){navigate(getNavLink(localStorage.getItem('Role')));}}, [])


  return (
    <div class="mx-md-n5  bg-login-container" style={{height:900,marginTop:-290,width:1500}}>
      <br></br><br></br><br></br><br></br><br></br>
    <div style={{justifyContent:'center',height:100,marginTop:270,width:250,marginLeft:550}}>
      <div className='text-center align-self-center'>
        <Form >
       <Card style={{borderRadius: 8, overflow: Hidden}}>
       <Typography variant="h6" gutterBottom component="div" style={{padding:10}}>
        Ikyam
      </Typography>
      <CardContent style={{background:'#f0f7f7'}}>
     
      
      <Grid container spacing={2}>

      <Grid item xs={12}>
      <TextField
         placeholder='User Name'
          // id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'username')}
          size="small"
          value={values?.username}
          fullWidth
        />
</Grid>
<Grid item xs={12}>
<TextField
           placeholder='Password'
        //  id="outlined-size-small"
         fullWidth
         size="small"         
         value={values?.password}
         onChange={(e)=>handleChange(e.target.value,'password')}
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
</Grid>
</Grid>
 <Button variant="text" style={{fontSize: '12px', textTransform: 'none', display: 'flex', marginLeft: 'auto'}} onClick={handleForgotPass}>Forgot Password</Button>
  <Button variant="contained" style={{background:'#02503f',marginTop:10}} fullWidth onClick={handleSubmit}>Login</Button>
      </CardContent>
     
    </Card>
    </Form>
    </div>
    </div>
    <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{marginLeft: '40%', maxWidth: '30%'}}
        >
        <DialogTitle id="alert-dialog-title" style={{fontSize: '15px'}}>
          Forgot Password
          <c style={{float:'right'}} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="body"  component="div" style={{fontSize: '12px', padding:2}}>
        
        To change your password, email your username from registered email ID to IKYAM support team. 
        Our admin will verify and reset your password
        <br></br><br></br>
        <b>Support ID:    </b>support@ikyam.com
      </Typography>
      </DialogContentText>
      </DialogContent>
        <DialogActions>
        <button type="button" class="btn btn-primary rounded btn-sm  ml-1" onClick={handleForgotPass}>Cancel</button>
        </DialogActions>
      </Dialog>
  </div>
  )
}
