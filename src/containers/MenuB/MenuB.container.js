//Finishing  UI completed

import React, { Component }  from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import {DeleteFinishingById, fetchAllFinishing, saveFinishing,fetchFinishingById} from '../../services/MenuB/menuB.service.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {TextField,MenuItem,Select} from '@mui/material';
import { properties } from '../../components/MenuBLabelProperties';
import { useLocation } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker, DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import {useNavigate} from 'react-router-dom'

import { FormControl } from 'react-bootstrap';
import moment from 'moment';
import { event } from 'jquery';
import { enLocale } from 'date-fns/locale/en-IN';
import { parse, format } from 'date-fns';
import { now } from 'moment';
import { trim } from 'lodash';

  export default function MenuBComponent(){
    let navigate = useNavigate();
    const [disabled, setDisabled] = useState(false)
    
  const [role,setRole] =useState(localStorage.getItem('Role'))
  const search = useLocation().search;
  const [status,setStatus] =useState(localStorage.getItem(''))
  const [statusdisabled, setStatusDisabled] = useState(true)
  let [uiDate]=useState(new Date());
  let [data1, setData1] = useState()
  let [token, setToken] = useState('')
  const [dateValue, setDateValue] = useState(null);
  let [values, setValues] = useState({
   
    manager_name: '',
    username:'',
    finishingid:'',
    shift:'',    
    userid:localStorage.getItem('UserId'),
    date: '',   
    comments:'',
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
    // id:''
  
  });

  const handleChange = (event,field) => {
    setValues(prevValues => ({...prevValues, [field]: event}));
  };

  const handleFieldChange = async (stringVal,field) => {
    setValues(prevValues => ({...prevValues, [field]: stringVal}));
  };

  // const handleChange = (event,field) => {
  //   setValues({ ...values, [field]: event});
  // };
 
  // const handleDateChange = (dateValue) => {
  //   alert("handleDateChange" + dateValue);
  //   setValues({...values, ['uiDate']:dateValue, ['date']:format(dateValue, "dd-MM-yyyy hh:mm:ss")});
  // }

  const handleDateChange = (dateValue) => {
    //alert("handleDateChange" + dateValue);
    setDateValue(dateValue);
    setValues(prevValues => ({...prevValues, ['date']:format(dateValue, "dd-MM-yyyy hh:mm:ss")}));
  }


  const apiData = (dataObject) => {setValues({...values, ...dataObject})};

  useEffect(() => {

    // console.log("useEffect.." + dateValue);
    const id = new URLSearchParams(search).get('menu_id');
    console.log( "inside menu b menu id",id );  
    const token = localStorage.getItem('AccessToken');
    if( localStorage.getItem('Role')!==undefined) setRole(localStorage.getItem('Role'))
    console.log("role", role)      
      
    if (token)  setToken(token);
    if(id  != null) {
      // const data =  fetchAllFinishing();
        const data=fetchFinishingById(id);
        data.then(function (record) {
          setValues(record); 
          console.log("rrrr", record.field_29)
          setStatus(record.field_29)
          
          setUIDate(record.date)});
          console.log("status",status)
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

 const handleEditSubmit= (e) => {
    e.preventDefault();

    console.log("eedit");
    setDisabled(false)   
    console.log("edit role",role)
    if(role==="approver") {console.log(role); setStatusDisabled(false);}
    else  {console.log(role); setStatusDisabled(true);};
 
  }
  
  const handleSubmit= (e) => {
    e.preventDefault();
  
    let allowSubmit = "";

    //eslint-disable-next-line no-restricted-globals
    if( role !== "approver" && confirm('Do you want to submit')){
      allowSubmit = "Go";
    }
    else if (role === "approver")
    {
      if(values.comments===undefined || values.comments===null || trim(values.comments).length === 0)
      {
        setData1("**Please fill the comments");
        alert('Please fill in comments field')
      }
      else allowSubmit = "Go"; 
    }

    if(allowSubmit)
    {
      console.log("Stringify",JSON.stringify(values)); 
      const data =  saveFinishing(JSON.stringify(values), values.finishingid);    
      data.then(()=>{    
        console.log(data)
        alert("Data submitted successfully!");
        navigate('/dashboard');
      });
    }
  }
  const handleBackSubmit= (e) => {
    e.preventDefault();
    navigate('/dashboard');
  }
  const handleApproved= (e) => {
    e.preventDefault();
  
     //eslint-disable-next-line no-restricted-globals
      if(confirm('Do you want to Approve')){
        console.log("comments",values.comments);
        if(values.comments===undefined || values.comments===null || trim(values.comments).length === 0)
        {
          setData1("**Please fill the comments")
          alert('Please fill the comments field')
        }
        else{
          values.field_29=properties.approve;
          setValues(prevValues => ({...prevValues, ['field_29']: properties.approve}));

          console.log("field_29",values.field_29);
          const data =  saveFinishing(JSON.stringify(values), values.finishingid);    
          data.then(()=>{    
            console.log(data)
            alert("Data Approved: " + data);
            });
        }
    }
  }
  const handleRejected= (e) => {
    e.preventDefault();  
    console.log("comments",values.comments);
    // eslint-disable-next-line no-restricted-globals
    if( confirm('Do you want to Reject')){
      console.log("comments",values.comments);
      if(values.comments===undefined || values.comments===null || trim(values.comments).length === 0)
      {
        setData1("**Please fill the comments");
        alert('Please fill the comments field');
      }
      else{
        values.field_29=properties.reject;
        setValues(prevValues => ({...prevValues, ['field_29']: properties.reject}));

        console.log("field_29",values.field_29);
        const data =  saveFinishing(JSON.stringify(values), values.finishingid);    
        data.then(function(val) {    
        console.log(val)
        alert("Data Rejected: " + data);
        })
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
                            {/* <TextField
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
                            </TextField> */}
  
  
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
                  </div> <br></br>
             
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
                <div class="p-2"><TextField  value={values?.field_2} id={properties.field_2}   label={properties.field_2}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_2')} />   </div>
                    
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
                    <div class="p-2"><TextField  value={values?.field_3} id={properties.field_3}   label={properties.field_3}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_3')} />   </div>
                      <div class="p-2"><TextField  value={values?.field_5}  id={properties.field_5}  label={properties.field_5}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_5')} /> </div>
                
                </div>
                <div class="col-6">
                <div class="p-2"><TextField value={values?.field_4} id={properties.field_4}   label={properties.field_4}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_4')} />   </div>
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
                    <div class="p-2"><TextField value={values?.field_6} id={properties.field_6} label={properties.field_6}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_6')} /> </div>
                   <div class="p-2"><TextField value={values?.field_7} id={properties.field_7}   label={properties.field_7}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_7')} />   </div>
                   <div class="p-2"><TextField value={values?.field_8} id={properties.field_8}   label={properties.field_8}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_8')} />   </div>
                       
                    <div class="p-2"><TextField value={values?.field_9} id={properties.field_9}   label= {properties.field_9}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_9')} />  </div>
                    <div class="p-2"><TextField value={values?.field_10} id={properties.field_10}   label={properties.field_10}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_10')} />   </div>
                    <div class="p-2"><TextField value={values?.field_11} id={properties.field_11}   label={properties.field_11}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_11')} />   </div>
                   
               
                </div>
                <div class="col-6">
                <div class="p-2"><TextField value={values?.field_12} id={properties.field_12}  label={properties.field_12}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_12')} /> </div>
                  <div class="p-2"><TextField value={values?.field_13} id={properties.field_13} label={properties.field_13}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_13')} /> </div>
                   <div class="p-2"><TextField value={values?.field_14} id={properties.field_14}   label={properties.field_14}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_14')} />   </div>
                   <div class="p-2"><TextField value={values?.field_15} id={properties.field_15}   label= {properties.field_15}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_15')} />  </div>
                    <div class="p-2"><TextField value={values?.field_16} id={properties.field_16}   label={properties.field_16}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_16')} />   </div>
                    <div class="p-2"><TextField value={values?.field_17} id={properties.field_17}  label={properties.field_17}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_17')} /> </div>
              
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
                <div class="p-2"><TextField value={values?.field_18} id={properties.field_18}   label= {properties.field_18}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_18')} />  </div>
                                   
                </div>
                <div class="col-6">
                                
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
                    <div class="p-2"><TextField value={values?.field_19} id={properties.field_19}   label={properties.field_19}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_19')} />   </div>
                    <div class="p-2"><TextField value={values?.field_20} id={properties.field_20}   label={properties.field_20}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_20')} />   </div>
                </div>
                <div class="col-6">
                    <div class="p-2"><TextField value={values?.field_21} id={properties.field_21}   label={properties.field_21}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_21')} />   </div>
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
                     <div class="p-2"><TextField value={values?.field_22} id={properties.field_22}   label= {properties.field_22}  size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_22')} />  </div>
                    <div class="p-2"><TextField value={values?.field_23} id={properties.field_23}   label={properties.field_23}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_23')} />   </div>
                    <div class="p-2"><TextField value={values?.field_24} id={properties.field_24}   label={properties.field_24}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_24')} />   </div>
                    <div class="p-2"><TextField value={values?.field_25} id={properties.field_25}   label={properties.field_25}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_25')} />   </div>
                </div>
                <div class="col-6">
                   <div class="p-2"><TextField value={values?.field_26} id={properties.field_26}    label={properties.field_26}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_26')} /> </div>
                   <div class="p-2"><TextField value={values?.field_27} id={properties.field_27}    label={properties.field_27}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_27')} /> </div>
                   <div class="p-2"><TextField value={values?.field_28} id={properties.field_28}    label={properties.field_28}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_28')} />   </div>
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
              
                <div class="col-6">
                <div class="p-2">
                  {/* <TextField value={values?.field_29} id={properties.field_29} label={properties.field_29}  size="small" disabled={true} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_29')} />    */}
                  {role ==="approver" &&
                  <TextField
                    fullWidth
                    variant='outlined'
                    select
                    id={properties.field_29}
                    label={properties.field_29}
                    renderValue={(value) => (value !== undefined ? value : 'Approval Status')}
                    sx={{ maxHeight:30, textAlign:"left"}}
                    value={values?.field_29} disabled={statusdisabled}  onChange={(e)=>handleChange(e.target.value,'field_29')}
                    size="small"
                    >
                    <MenuItem key={properties.waiting} value={properties.waiting}>{properties.waiting}</MenuItem>
                    <MenuItem key={properties.approve} value={properties.approve}>{properties.approve}</MenuItem>
                    <MenuItem key={properties.reject} value={properties.reject}>{properties.reject}</MenuItem>
                  </TextField> 
                  }
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
            {status !="Approved" &&
                <>              
                <button type="button" class="btn btn-success rounded btn-sm"  onClick={handleEditSubmit}>Edit</button>
                <button type="button" class="btn btn-warning rounded btn-sm  ml-2" onClick={handleSubmit}>Submit</button>
                </>
            }
            {status ==="Approved" &&
                <>              
                <button type="button" class="btn btn-success rounded btn-sm"  onClick={handleBackSubmit}>Back to Dashboard</button>            
                </>
            }
                {/* {role ==="approver" && 
                <>                   
                <button type="button" class="btn btn-danger rounded btn-sm ml-2" onClick={handleRejected}>Reject</button>               
                <button type="button" class="btn btn-primary rounded btn-sm " onClick={handleApproved}>Approved</button>
                </>
                } */}
            </div>        
            </div>
      </div>     
    </div>


  </div>
  
  )
 }