import React,{useState} from 'react'
import {Card,CardContent,Button,Grid,TextField,IconButton,Typography, Hidden} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form } from 'react-bootstrap'
import '../../App.css';
import { login } from '../../services/login/login.service';
import { showToasterSubject } from '../../services/toastr/toaster.service';
import {useNavigate} from 'react-router-dom'

export const Login = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({
    username: '',
    password: '',
    active : true,
  });
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
  const handleSubmit=async (event )=>{
    event.preventDefault();
    const response =  await login(values)
    localStorage.setItem('AccessToken',response.data.token)
    localStorage.setItem('Role',response.data.role)
    localStorage.setItem('userId',((response.data.userid || response.data.userid !== undefined)?response.data.userid:values.username));
    showToasterSubject.next({type:'success',value:'login successfully'})
    navigate('/dashboard')
    
  }
  return (
    <div class="mx-md-n5  bg-login-container" style={{height:900,marginTop:-290,width:1500}}>
      <br></br><br></br><br></br><br></br><br></br>
    <div style={{justifyContent:'center',height:100,marginTop:250,width:250,marginLeft:500}}>
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
 
  <Button variant="contained" style={{background:'#02503f',marginTop:10}} fullWidth onClick={handleSubmit}>Login</Button>


      </CardContent>
     
    </Card>
    </Form>
    </div>
    </div>
  </div>
  )
}
