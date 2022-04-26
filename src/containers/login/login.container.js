import React,{useState} from 'react'
import {Card,CardContent,Button,Grid,TextField,IconButton,Typography} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form } from 'react-bootstrap'
import { login } from '../../services/login/login.service';
import { showToasterSubject } from '../../services/toastr/toaster.service';


export const Login = () => {

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
    console.log(values)
     await login(values)
    
    showToasterSubject.next({type:'success',value:'login successfully'})
   //history.push('/cpp')
  }
  return (
    <div style={{display:'flex',justifyContent:'center',height:100,marginTop:250,}}>
      <div className='text-center align-self-center'>
        <Form >
       <Card >
       <Typography variant="h6" gutterBottom component="div" style={{padding:10}}>
        Ikyam
      </Typography>
      <CardContent style={{background:'#bbc4c2'}}>
     
      
      <Grid container spacing={2}>

      <Grid item xs={12}>
      <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'username')}
          size="small"
          value={values?.username}
          fullWidth
        />
</Grid>
<Grid item xs={12}>
<TextField
           placeholder='Enter the Password'
         id="outlined-size-small"
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
            edge="end"
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
  )
}
