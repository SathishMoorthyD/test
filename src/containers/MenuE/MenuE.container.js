//Pulp UI have to do 50 fields
import React, { Component }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import {fetchAllPulp,savePulp,fetchPulpById,DeletePulp,} from '../../services/MenuE/menuE.service.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {TextField,MenuItem,Select} from '@mui/material';
import { properties } from '../../components/MenuELabelProperties';
import { useLocation } from "react-router-dom";
import { parse, format } from 'date-fns';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker, DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';

export default function MenuEComponent(){

  const search = useLocation().search;
  const [disabled, setDisabled] = useState(false)
  const [role,setRole] =useState(localStorage.getItem('Role'))
  let [token, setToken] = useState('')
  const [statusdisabled, setStatusDisabled] = useState(true)
  let [data1, setData1] = useState()
  const [dateValue, setDateValue] = useState(null);
  let [values, setValues] = useState({    
    comments:'',
    userid:'',
    shift:'',   
    date:'',
    line:'',    
    manager_name: "",
    pulpid: "",   
    username: "",
    field_1:'',
    field_2:'',
    field_3:'',
    field_4:'',
    field_5:'',
    field_6:'',
    field_7:'',
    field_8:'',
    field_9:'',
    field_10:'',
    field_11:'',
    field_12:'',
    field_13:'',
    field_14:'',
    field_15:'',
    field_16:'',
    field_17:'',
    field_18:'',
    field_19:'',
    field_20:'',
    field_21:'',
    field_22:'',
    field_23:'',
    field_24:'',
    field_25:'',
    field_26:'',
    field_27:'',
    field_28:'',
    field_29:'',
    field_30:'',
    field_31:'',
    field_32:'',
    field_33:'',
    field_34:'',
    field_35:'',
    field_36:'',
    field_37:'',
    field_38:'',
    field_39:'',
    field_40:'',
    field_41:'',
    field_42:'',
    field_43:'',
    field_44:'',
    field_45:'',
    field_46:'',
    field_47:'',
    field_48:'',
    field_49:'',
    field_50:'',

  });
  const handleChange = (event,field) => {
    setValues(prevValues => ({...prevValues, [field]: event}));
  };
  // const handleDateChange = (dateValue) => {
  //   alert("handleDateChange" + dateValue);
  //   setValues({...values, ['uiDate']:dateValue, ['date']:format(dateValue, "dd-MM-yyyy hh:mm:ss")});
  // }


useEffect(() => {
  const id = new URLSearchParams(search).get('menu_id');
  console.log( "inside menuE  menu id",id );  
  const token = localStorage.getItem('AccessToken');
      if( localStorage.getItem('Role')!=undefined) setRole(localStorage.getItem('Role'))
      console.log("role", role)            
      if (token)  setToken(token);

     if(id  != null) {
    // const data =  fetchAllPulp();   
        const data= fetchPulpById(id); 
        data.then(function (record) {setValues(record[0]); setUIDate(record[0].date)}); 
        setDisabled(true)
        setStatusDisabled(true)
      }   
      else {
        handleDateChange(new Date());
      }
      
}, [])

const setUIDate = (uiDateValue) => 
{ 
  console.log("setUIDate " + uiDateValue);
  setDateValue(moment(uiDateValue, "DD-MM-yyyy hh:mm:ss").toDate());
};
const handleDateChange = (dateValue) => {
  //alert("handleDateChange" + dateValue);
  setDateValue(dateValue);
  setValues(prevValues => ({...prevValues, ['date']:format(dateValue, "dd-MM-yyyy hh:mm:ss")}));
}

 const handleEditSubmit= (e) => {
    e.preventDefault();

    console.log("eedit");
    setDisabled(false)   
    if(role ==="Manager") setStatusDisabled(false)
    else  setStatusDisabled(true)
  }
  
  const handleSubmit= (e) => {
    e.preventDefault();
  
    // eslint-disable-next-line no-restricted-globals
        if( confirm('Do you want to submit')){

          // console.log("comments",values.comments);
          // if(values.comments==undefined){ setData1("** Please fill the comments")}
          // else{
          console.log("stringify",JSON.stringify(values))
          const data =  savePulp(JSON.stringify(values));    
          data.then(function(val) {    
          console.log(val)
          alert("Data submited")
          });
        // }
      }
  }

  const handleApproved= (e) => {
    e.preventDefault();
   
     // eslint-disable-next-line no-restricted-globals
        if( confirm('Do you want to Approve')){
          console.log("comments",values.comments);
          if(values.comments==undefined)
          { setData1("** Please fill the comments")
          alert('Please fill the comments field')
          }
          else{
        console.log("field1",values.field_1)
        const data =  savePulp(JSON.stringify(values));    
        data.then(function(val) {    
        console.log(val)
        alert("Data Approved")
        });
      }
    }
  }
  const handleRejected= (e) => {
    e.preventDefault();  

    
    console.log("comments",values.comments)
     // eslint-disable-next-line no-restricted-globals
      if( confirm('Do you want to Reject')){
        console.log("comments",values.comments);
        if(values.comments==undefined)
        { setData1("** Please fill the comments")
        alert('Please fill the comments field')
        }
        else{
        console.log("field1",values.field_1)
        const data =  DeletePulp(JSON.stringify(values.field_1));    
        data.then(function(val) {    
        console.log(val)
        alert("Data Rejected")
        });
     }
    }
  }

 return (
   
    <div class="p-3 container-sm">
   
    
<div class="card">
    <div class="card-header">{properties.general}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >                   
                    <div class="p-1">
                    {/* <TextField id={properties.date} value={values.date}  label= {properties.date} disabled={disabled} size="small"  fullWidth onChange={(e)=> handleChange(e.target.value,'date')} /> */}
                    {/* <select label={properties.line} class="w-100 form-control form-control-sm rounded"  value={values.line} disabled={disabled}  onChange={(e)=>handleChange(e.target.value,'line')} >
                        <option value={properties.lineA}>{properties.lineA}</option>
                        <option value={properties.lineB}>{properties.lineB}</option>
                        <option value={properties.lineC}>{properties.lineC}</option>
                        <option value={properties.lineD}>{properties.lineD}</option>
                        <option value={properties.lineE}>{properties.lineE}</option>  
                      </select> */}
                       <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDateTimePicker
                        size="small"  
                        id={properties.date}
                        disabled={disabled}
                        label={properties.date}
                        inputFormat="dd-MM-yyyy hh:mm:ss"
                        mask="__-__-____ __:__:__"
                        value={dateValue}
                        renderValue={values?.date}
                        onChange={(day) => {handleDateChange(day);}}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                        </div>
                        <div class="p-1">  
                          <TextField
                            variant='outlined'
                            select
                            id="simple-select-line"
                            label="Line"
                            renderValue={(value) => (value !== undefined ? value : 'Line')}
                            sx={{ maxHeight:30, textAlign:"left",width:"60%"}}
                            value={values?.line} disabled={disabled}  onChange={(e)=>handleChange(e.target.value,'line')}
                            size="small"  >
                            <MenuItem key={properties.lineA} value={properties.lineA}>{properties.lineA}</MenuItem>
                            <MenuItem key={properties.lineB} value={properties.lineB}>{properties.lineB}</MenuItem>
                            <MenuItem key={properties.lineC} value={properties.lineC}>{properties.lineC}</MenuItem>
                            <MenuItem key={properties.lineD} value={properties.lineD}>{properties.lineD}</MenuItem>
                            <MenuItem key={properties.lineE} value={properties.lineE}>{properties.lineE}</MenuItem>
                          </TextField>
                     </div>
                
                </div>
                <div class="col-6">
                <div class="p-1">
                  {/* <TextField id={properties.shift} value={values.shift} label={properties.shift}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'shift')} />  */}
                  {/* <select label={properties.shift} value={values.shift} class="w-100 form-control form-control-sm rounded"  disabled={disabled}  onChange={(e)=>handleChange(e.target.value,'shift')} >
                        <option value={properties.shift1}>{properties.shift1}</option>
                        <option value={properties.shift2}>{properties.shift2}</option>
                        <option value={properties.shift3}>{properties.shift3}</option>                       
                      </select> */}

                            <TextField
                            variant='outlined'
                            select
                            id="simple-select-shift"
                            label="Shift"
                            renderValue={(value) => (value !== undefined ? value : 'Shift')}
                            sx={{ maxHeight:30, textAlign:"left",width:"60%"}}
                            value={values?.shift} disabled={disabled}  onChange={(e)=>handleChange(e.target.value,'shift')}
                            size="small"
                            >
                            <MenuItem key={properties.shift1} value={properties.shift1}>{properties.shift1}</MenuItem>
                            <MenuItem key={properties.shift2} value={properties.shift2}>{properties.shift2}</MenuItem>
                            <MenuItem key={properties.shift3} value={properties.shift3}>{properties.shift3}</MenuItem>
                          </TextField> 
                  </div>
             
                </div>
                </div>
          </div>
      </div>     
  </div> <br></br>

  <div class="card">
    <div class="card-header">{properties.group1}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >                   
                  <div class="p-2"><TextField  value={values?.field_1} id={properties.field_1}   label= {properties.field_1}  size="small" disabled={disabled}  fullWidth onChange={(e)=> handleChange(e.target.value,'field_1')} />  </div>
                </div>
                <div class="col-6">              
                    
                </div>
                </div>
          </div>
      </div>     
  </div> <br></br>

  <div class="card">
    <div class="card-header">{properties.group2}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >                   
                <div class="p-2"><TextField  value={values?.field_2} id={properties.field_2}   label={properties.field_2}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_2')} />   </div>
                </div>
                <div class="col-6">               
                    
                </div>
                </div>
          </div>
      </div>     
  </div> <br></br>

  <div class="card">
    <div class="card-header">{properties.group3}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >                   
                    <div class="p-2"><TextField  value={values?.field_3} id={properties.field_3}   label={properties.field_3}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_3')} />   </div>
                    <div class="p-2"><TextField value={values?.field_4} id={properties.field_4}   label={properties.field_4}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_4')} />   </div>
                      <div class="p-2"><TextField  value={values?.field_5}  id={properties.field_5}  label={properties.field_5}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_5')} /> </div>
                      <div class="p-2"><TextField value={values?.field_6} id={properties.field_6} label={properties.field_6}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_6')} /> </div>
                </div>
                <div class="col-6">
                <div class="p-2"><TextField value={values?.field_7} id={properties.field_7}   label={properties.field_7}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_7')} />   </div>
                   <div class="p-2"><TextField value={values?.field_8} id={properties.field_8}   label={properties.field_8}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_8')} />   </div>
                       
                    <div class="p-2"><TextField value={values?.field_9} id={properties.field_9}   label= {properties.field_9}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_9')} />  </div>
              
                  </div>
                </div>
          </div>
      </div> 
    
  </div> <br></br>

  <div class="card">
    <div class="card-header">{properties.group4}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >          
                 
                       <div class="p-2"><TextField value={values?.field_10} id={properties.field_10}   label={properties.field_10}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_10')} />   </div>
                    <div class="p-2"><TextField value={values?.field_11} id={properties.field_11}   label={properties.field_11}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_11')} />   </div>
                    <div class="p-2"><TextField value={values?.field_12} id={properties.field_12}  label={properties.field_12}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_12')} /> </div>
                  <div class="p-2"><TextField value={values?.field_13} id={properties.field_13} label={properties.field_13}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_13')} /> </div>
            
               
                </div>
                <div class="col-6">
                     <div class="p-2"><TextField value={values?.field_14} id={properties.field_14}   label={properties.field_14}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_14')} />   </div>
                   <div class="p-2"><TextField value={values?.field_15} id={properties.field_15}   label= {properties.field_15}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_15')} />  </div>
                    <div class="p-2"><TextField value={values?.field_16} id={properties.field_16}   label={properties.field_16}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_16')} />   </div>
               
                </div>
                </div>
          </div>
      </div> 
    
  </div> <br></br>


  <div class="card">
    <div class="card-header">{properties.group5}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >    
                <div class="p-2"><TextField value={values?.field_17} id={properties.field_17}  label={properties.field_17}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_17')} /> </div>
                            
                <div class="p-2"><TextField value={values?.field_18} id={properties.field_18}   label= {properties.field_18}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_18')} />  </div>
                <div class="p-2"><TextField value={values?.field_19} id={properties.field_19}   label={properties.field_19}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_19')} />   </div>
                    <div class="p-2"><TextField value={values?.field_20} id={properties.field_20}   label={properties.field_20}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_20')} />   </div>
                    <div class="p-2"><TextField value={values?.field_21} id={properties.field_21}   label={properties.field_21}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_21')} />   </div>
                    <div class="p-2"><TextField value={values?.field_22} id={properties.field_22}   label= {properties.field_22}  size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_22')} />  </div>
                    <div class="p-2"><TextField value={values?.field_23} id={properties.field_23}   label={properties.field_23}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_23')} />   </div>
                    <div class="p-2"><TextField value={values?.field_24} id={properties.field_24}   label={properties.field_24}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_24')} />   </div>
                    <div class="p-2"><TextField value={values?.field_25} id={properties.field_25}   label={properties.field_25}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_25')} />   </div>
                    <div class="p-2"><TextField value={values?.field_26} id={properties.field_26}    label={properties.field_26}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_26')} /> </div>
                </div>
                <div class="col-6">
                <div class="p-2"><TextField value={values?.field_27} id={properties.field_27}    label={properties.field_27}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_27')} /> </div>
                   <div class="p-2"><TextField value={values?.field_28} id={properties.field_28}    label={properties.field_28}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_28')} />   </div>
                   <div class="p-2"><TextField value={values?.field_29} id={properties.field_29}    label={properties.field_29}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_29')} />   </div>       
                   <div class="p-2"><TextField value={values?.field_30} id={properties.field_30}    label={properties.field_30}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_30')} /> </div>
                   <div class="p-2"><TextField value={values?.field_31} id={properties.field_31}    label={properties.field_31}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_31')} />   </div>
                   <div class="p-2"><TextField value={values?.field_32} id={properties.field_32}    label={properties.field_32}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_32')} />   </div>       
                   <div class="p-2"><TextField value={values?.field_33} id={properties.field_33}    label={properties.field_27}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_33')} /> </div>
                   <div class="p-2"><TextField value={values?.field_34} id={properties.field_34}    label={properties.field_34}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_34')} />   </div>
                   <div class="p-2"><TextField value={values?.field_35} id={properties.field_35}    label={properties.field_35}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_35')} />   </div>       
                              
                
                
                </div>
                </div>
          </div>
      </div> 
    
  </div> <br></br>

  <div class="card">
    <div class="card-header">{properties.group6}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >                   
                <div class="p-2"><TextField value={values?.field_36} id={properties.field_36}    label={properties.field_36}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_36')} /> </div>
                   <div class="p-2"><TextField value={values?.field_37} id={properties.field_37}    label={properties.field_34}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_37')} />   </div>
                   <div class="p-2"><TextField value={values?.field_38} id={properties.field_38}    label={properties.field_38}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_38')} />   </div>       
             
                    </div>
                <div class="col-6">
                <div class="p-2"><TextField value={values?.field_39} id={properties.field_39}    label={properties.field_39}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_39')} /> </div>
                   <div class="p-2"><TextField value={values?.field_40} id={properties.field_40}    label={properties.field_40}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_40')} />   </div>
         
                  </div>
                </div>
          </div>
      </div> 
    
  </div> <br></br>

  <div class="card">
    <div class="card-header">{properties.group7}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
                <div class="col-6" >                   
                <div class="p-2"><TextField value={values?.field_41} id={properties.field_41}    label={properties.field_41}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_41')} />   </div>
                   <div class="p-2"><TextField value={values?.field_42} id={properties.field_42}    label={properties.field_42}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_42')} />   </div>       
                   <div class="p-2"><TextField value={values?.field_43} id={properties.field_43}    label={properties.field_43}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_43')} /> </div>
                   <div class="p-2"><TextField value={values?.field_44} id={properties.field_44}    label={properties.field_44}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_44')} />   </div>
                   <div class="p-2"><TextField value={values?.field_45} id={properties.field_45}    label={properties.field_45}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_45')} />   </div>       
               
              
                   </div>
                <div class="col-6">
                <div class="p-2"><TextField value={values?.field_46} id={properties.field_46}    label={properties.field_31}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_46')} />   </div>
                   <div class="p-2"><TextField value={values?.field_47} id={properties.field_47}    label={properties.field_32}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_47')} />   </div>       
                   <div class="p-2"><TextField value={values?.field_48} id={properties.field_48}    label={properties.field_27}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_48')} /> </div>
                   <div class="p-2"><TextField value={values?.field_49} id={properties.field_49}    label={properties.field_34}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_49')} />   </div>
                
                    </div>
                </div>
          </div>
      </div> 
    
  </div> <br></br>

  <div class="card">
    <div class="card-header">{properties.group8}</div>
      <div class="card-body">
          <div class="row align-items-start">
             <div class="row gx-5">
              
                <div class="col-6">
                <div class="p-2">
                  {/* <TextField value={values?.field_50} id={properties.field_50}    label={properties.field_50}  size="small" disabled={statusdisabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_50')} />    */}
                  <TextField
                    fullWidth
                    variant='outlined'
                    select
                    id={properties.field_50}
                    label={properties.field_50}
                    renderValue={(value) => (value !== undefined ? value : 'Approval Status')}
                    sx={{ maxHeight:30, textAlign:"left"}}
                    value={values?.field_50} disabled={statusdisabled}  onChange={(e)=>handleChange(e.target.value,'field_50')}
                    size="small"
                    >
                    <MenuItem key={properties.approve} value={properties.approve}>{properties.approve}</MenuItem>
                    <MenuItem key={properties.reject} value={properties.reject}>{properties.reject}</MenuItem>
                  </TextField>
                </div>
                <div class="p-2"><textarea disabled={statusdisabled} value={values?.comments}  id={properties.comments} label={properties.comments} rows='3' cols='55'   fullWidth size="small"  required  onChange={(e)=>handleChange(e.target.value,'comments')} ></textarea> </div> 
                {/* <div class="p-2"> <span class="text-danger">{data1}</span></div>                                         */}
                </div>
                <div class="col-6">                    
                
                </div>
              </div>
          </div>
      </div> 
    
  </div> <br></br>

  <div class="card">    
      <div class=" card-body">
           <div class="row text-right">
            <div class="col-md-12  text-right">
                               
                <button type="button" class="btn btn-success rounded btn-sm"  onClick={handleEditSubmit}>Edit</button>
                <button type="button" class="btn btn-warning rounded btn-sm  ml-2" onClick={handleSubmit}>Submit</button>
                {role ==="Manager" && 
                    <>
                   
                <button type="button" class="btn btn-danger rounded btn-sm ml-2"  onClick={handleRejected}>Reject</button>               
                <button type="button" class="btn btn-primary rounded btn-sm " onClick={handleApproved}>Approved</button>
                </>
              }
            </div>        
            </div>
      </div>     
    </div>


  </div>
  
  )
 }

