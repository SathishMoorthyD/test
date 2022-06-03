import React  from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CustomAccordion } from '../../custom/custom-accordion/custom-accordion';
import { Grid  ,InputLabel, TextField, Button, Paper} from '@mui/material';
import { fetchQueryCPP, saveCPP } from '../../services/cpp/cpp.service';
import { styled } from '@mui/material/styles';
import { useParams , useNavigate} from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function CPPCompnent ()  {
  const params = useParams();
  let navigate = useNavigate();
  const [cppValues, setcppValues] = useState({
    cppid: "",
    date: "",
    field_1: "",
    field_10: "",
    field_11: "",
    field_12: "",
    field_13: "",
    field_14: "",
    field_15: "",
    field_16: "",
    field_17: "",
    field_18: "",
    field_19: "",
    field_2: "",
    field_20: "",
    field_21: "",
    field_22: "",
    field_23: "",
    field_24: "",
    field_25: "",
   field_26: "",
  field_27: "",
   field_28: "",
   field_29: "",
   field_3: "",
  field_30: "",
    field_31: "",
    field_32: "",
    field_33: "",
    field_34: "",
    field_4: "",
    field_5: "",
    field_6: "",
    field_7: "",
    field_8: "",
    field_9: "",
    line: "",
    shift: "",
    userid: "",
    username: ""
  })

  const handleChange = (event,field) => {
    setcppValues({ ...cppValues, [field]: event });
  };

  const handleBack=()=>{
    navigate('/cpp')
  }
  const handleSubmit=async (event )=>{
    event.preventDefault();
    console.log(cppValues)
     await saveCPP(cppValues)

  }

  const fethQuery=()=>{
    const response = fetchQueryCPP(params.id)
    setcppValues(response.data)
  }
useEffect(() => {
if(params.id > 0){
  fethQuery()
}
 
},[]);


  return (
    <div style={{marginTop:20}}>
  
    <CustomAccordion accordionDetailData={
     <Grid container spacing={1}
     >
     <Grid item xs={3}>
       <Item> 
       <InputLabel shrink>field_1</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_1')}
          size="small"
          value={cppValues?.field_1}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
       <Item>
       <InputLabel shrink>field_2</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_2')}
          size="small"
          value={cppValues?.field_2}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_3</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_3')}
          size="small"
          value={cppValues?.field_3}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_4</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_4')}
          size="small"
          value={cppValues?.field_4}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_5</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_5')}
          size="small"
          value={cppValues?.field_5}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_6</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_6')}
          size="small"
          value={cppValues?.field_6}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_7</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_7')}
          size="small"
          value={cppValues?.field_7}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_8</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_8')}
          size="small"
          value={cppValues?.field_8}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_9</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_9')}
          size="small"
          value={cppValues?.field_9}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_10</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_10')}
          size="small"
          value={cppValues?.field_10}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_11</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_11')}
          size="small"
          value={cppValues?.field_11}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_12</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_12')}
          size="small"
          value={cppValues?.field_12}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_13</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_13')}
          size="small"
          value={cppValues?.field_13}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_14</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_14')}
          size="small"
          value={cppValues?.field_14}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_15</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_15')}
          size="small"
          value={cppValues?.field_15}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_16</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_16')}
          size="small"
          value={cppValues?.field_16}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_17</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_17')}
          size="small"
          value={cppValues?.field_17}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_18</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_18')}
          size="small"
          value={cppValues?.field_18}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_19</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_19')}
          size="small"
          value={cppValues?.field_19}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_20</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_20')}
          size="small"
          value={cppValues?.field_20}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_21</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_21')}
          size="small"
          value={cppValues?.field_21}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_22</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_22')}
          size="small"
          value={cppValues?.field_22}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_23</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_23')}
          size="small"
          value={cppValues?.field_23}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_24</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_24')}
          size="small"
          value={cppValues?.field_24}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_25</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_25')}
          size="small"
          value={cppValues?.field_25}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_26</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_26')}
          size="small"
          value={cppValues?.field_26}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_27</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_27')}
          size="small"
          value={cppValues?.field_27}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_28</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_28')}
          size="small"
          value={cppValues?.field_28}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_29</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_29')}
          size="small"
          value={cppValues?.field_29}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_30</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_30')}
          size="small"
          value={cppValues?.field_30}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_31</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_31')}
          size="small"
          value={cppValues?.field_31}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_32</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_32')}
          size="small"
          value={cppValues?.field_32}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_33</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_33')}
          size="small"
          value={cppValues?.field_33}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>field_34</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'field_34')}
          size="small"
          value={cppValues?.field_34}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>line</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'line')}
          size="small"
          value={cppValues?.line}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>shift</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'shift')}
          size="small"
          value={cppValues?.shift}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>username</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'username')}
          size="small"
          value={cppValues?.username}
          fullWidth
        /></Item>
     </Grid>
     <Grid item xs={3}>
     <Item> 
       <InputLabel shrink>date</InputLabel>
         <TextField
         placeholder='Enter the UserName'
          id="outlined-size-small"
          onChange={(e)=>handleChange(e.target.value,'date')}
          size="small"
          value={cppValues?.date}
          fullWidth
        /></Item>
     </Grid>
     

     </Grid>
    } 
    accordionTitle="CPP" openPanel="basicDetails"></CustomAccordion>
        <Paper style={{display:'flex',position:'sticky',width:'100%',justifyContent:'flex-end',flexDirection:'row'}}>
        <Button size="small"  variant="contained" sx={{margin:2}} onClick={handleBack}>Back</Button>
    <Button size="small"  variant="contained" sx={{margin:2}} onClick={handleSubmit}>Save</Button>
       </Paper>
    </div>
  )
}




