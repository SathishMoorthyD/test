//JR Master - UI done

import React, { Component }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../App.css';
import {TextField,MenuItem,Select} from '@mui/material';
import {fetchAllJrmaster,saveJrmaster,DeleteJrmasterById,fetchJrmasterById} from '../../services/MenuC/menuC.service.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// import {TextField} from '@mui/material';
import { properties } from '../../components/MenuCLabelProperties';
import { useLocation } from "react-router-dom";

import { parse, format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker, DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
export default function MenuCComponent(){

 
  const search = useLocation().search;
  const [disabled, setDisabled] = useState(false)
  const [role,setRole] =useState(localStorage.getItem('Role'))
  let [token, setToken] = useState('')
  const [dateValue, setDateValue] = useState(null);  
  const [statusdisabled, setStatusDisabled] = useState(true)
  let [data1, setData1] = useState()
  let [values, setValues] = useState({
    
    manager_name: '',
    username:'',
    shift:'',
    section:'',
    userId:'',
    date:'',
    jrmasterid:'',
    // uiDate: new Date(),
    line:'',    
    field_1:'',
    field_2:'',
    field_3:'',
    field_4:'',
    field_5:'',       
    comments:'', 
  
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
      console.log( "inside menu b user id",id );  
        const token = localStorage.getItem('AccessToken');
        if( localStorage.getItem('Role')!=undefined) setRole(localStorage.getItem('Role'))
        console.log("role",role)            
        if (token)  setToken(token);

    
    if(id  != null) {
      // const data =  fetchAllJrmaster();   
      const data =  fetchJrmasterById(id);
      data.then(function (record) {setValues(record); setUIDate(record.date)}); 
      
          setDisabled(true)
          setStatusDisabled(true)  
        }   
        else {
          handleDateChange(new Date());
        }
    
        // getData();
    
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
      console.log("edit role",role)
      if(role ==="Manager") setStatusDisabled(false)
      else  setStatusDisabled(true)  
    }
    
    const handleSubmit= (e) => {
      e.preventDefault();
   
      // eslint-disable-next-line no-restricted-globals
          if( confirm('Do you want to submit')){
  
            // console.log("comments",values.comments);
            // if(values.comments==undefined)alert('Please fill the comments field')
            // else{
            console.log("stringify ",JSON.stringify(values))
            const data =  saveJrmaster(JSON.stringify(values),values.jrmasterid);    
            data.then(function(val) {    
            console.log(val)
            alert("Data submitted")
            });
          // }
        }
    }
  
    const handleApproved= (e) => {
      e.preventDefault();
  
       // eslint-disable-next-line no-restricted-globals
          if( confirm('Do you want to Approve')){
            console.log("comments",values.comments);
            if(values.comments==undefined){
              setData1("** Please fill the comments")
              alert('Please fill the comments field')
            }
            else{
          console.log("field1",values.field_1)
          const data =  saveJrmaster(JSON.stringify(values),values.jrmasterid);   
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
          if(values.comments==undefined){
            alert('Please fill the comments field')
            setData1("** Please fill the comments")
          }
          else{
          console.log("field1",values.field_1)
          const data =  saveJrmaster(JSON.stringify(values),values.jrmasterid);    
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
                      <div class="p-2"><TextField  value={values?.field_2} id={properties.field_2}   label={properties.field_2}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_2')} />   </div>
                     </div>
                  <div class="col-6">
                  <div class="p-2"><TextField  value={values?.field_3} id={properties.field_3}   label={properties.field_3}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_3')} />   </div>
                      <div class="p-2"><TextField value={values?.field_4} id={properties.field_4}   label={properties.field_4}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_4')} />   </div>
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
                  <div class="col-6">
                  <div class="p-2">
                    {/* <TextField  value={values?.field_5}  id={properties.field_5}  label={properties.field_5}    size="small" disabled={statusdisabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_5')} />  */}
                    <TextField
                    fullWidth
                    variant='outlined'
                    select
                    id={properties.field_5}
                    label={properties.field_5}
                    renderValue={(value) => (value !== undefined ? value : 'Approval Status')}
                    sx={{ maxHeight:30, textAlign:"left"}}
                    value={values?.field_5} disabled={statusdisabled}  onChange={(e)=>handleChange(e.target.value,'field_5')}
                    size="small"
                    >
                    <MenuItem key={properties.approve} value={properties.approve}>{properties.approve}</MenuItem>
                    <MenuItem key={properties.reject} value={properties.reject}>{properties.reject}</MenuItem>
                  </TextField>
                  </div>                 
                  <div class="p-2"><textarea disabled={statusdisabled} value={values?.comments}  id={properties.comments} label={properties.comments} rows='3' cols='55'   fullWidth size="small"  required  onChange={(e)=>handleChange(e.target.value,'comments')} ></textarea> </div> 
                  {/* <div class="p-2"> <span class="text-danger">{data1}</span></div>   */}
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
                         <button type="button" class="btn btn-primary rounded btn-sm "  onClick={handleApproved}>Approved</button>
                  </>
                }
              </div>        
              </div>
        </div>     
      </div>
  
  
    </div>
    
    )
   }
  
  