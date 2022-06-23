import React, { Component }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {TextField,MenuItem,Select} from '@mui/material';
import { properties } from '../../components/CppLabelProperties';
import { useLocation, useNavigate } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { fetchCPPById, saveCPP } from '../../services/cpp/cpp.service';
import { trim } from 'lodash';
import moment from 'moment';


  export default function CPP(){
    let navigate = useNavigate();
    const [role] =useState(localStorage.getItem('Role'))
    const search = useLocation().search;
        // const name = new URLSearchParams(search).get('name');
        
    // const[records]=useState([])
    const [disabled, setDisabled] = useState(false);
    const [statusdisabled, setStatusDisabled] = useState(true);
    const [status,setStatus] =useState(null)
    const [dateValue, setDateValue] = useState(null);
    let [data1, setData1] = useState([])
    let [values, setValues] = useState({
    manager_name: '',
    username:'',
    cppid:'',
    role:localStorage.getItem('Role'),
    shift:'',
    userid:localStorage.getItem('UserId'),
    date:'',
    line:'',
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
    comments:'',
    inputState: {readOnly:false}
  
  });
  const handleChange = (event,field) => {
    setValues({ ...values, [field]: event });
  };

  const handleDateChange = (dateValue) => {
    //alert("handleDateChange" + dateValue);
    setDateValue(dateValue);
    setValues(prevValues => ({...prevValues, ['date']:format(dateValue, "dd-MM-yyyy hh:mm:ss")}));
  }
 
   useEffect(() => {
      const id = new URLSearchParams(search).get('menu_id');
      console.log( "inside menu a menu id",id );
      if(id  != null) {
        const data=fetchCPPById(id);
        data.then(function (record) {
        setValues(record); 
        console.log("CPP Status", record.field_34)
        
        setStatus(record.field_34)
        setDateValue(moment(record.date, "DD-MM-yyyy hh:mm:ss").toDate());

        });
        console.log("status",status)
        setDisabled(true)
        setStatusDisabled(true)
        }
        else {
          handleDateChange(new Date());
        }      

    }, [])

   
  
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
      const data =  saveCPP(JSON.stringify(values), values.cppid);    
      data.then(()=>{    
        console.log(data)
        alert("Data submitted successfully!");
        navigate('/dashboard');
      });
    }
  }

  const handleBackSubmit = (e) => {e.preventDefault(); navigate('/dashboard')}

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
                <div class="col-6">
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
                    </TextField>
                </div><br></br>
                <div class="p-1">
                  <TextField  value={values?.field_1} id={properties.field_1}   label= {properties.field_1}  size="small" disabled={disabled}  sx={{width:"60%"}} fullWidth onChange={(e)=> handleChange(e.target.value,'field_1')} />
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
                    <div class="p-2"><TextField  value={values?.field_2} id={properties.field_2}   label={properties.field_2}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_2')} />   </div>
                    <div class="p-2"><TextField  value={values?.field_3} id={properties.field_3}   label={properties.field_3}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_3')} />   </div>
                    <div class="p-2"><TextField value={values?.field_4} id={properties.field_4}   label={properties.field_4}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_4')} />   </div>
                    <div class="p-2"><TextField  value={values?.field_5}  id={properties.field_5}  label={properties.field_5}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_5')} /> </div>
                   <div class="p-2"><TextField value={values?.field_6} id={properties.field_6} label={properties.field_6}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_6')} /> </div>
                   <div class="p-2"><TextField value={values?.field_7} id={properties.field_7}   label={properties.field_7}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_7')} />   </div>
                   <div class="p-2"><TextField value={values?.field_8} id={properties.field_8}   label={properties.field_8}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_8')} />   </div>
                   <div class="p-2"><TextField value={values?.field_9} id={properties.field_9}   label= {properties.field_9}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_9')} />  </div>
                    <div class="p-2"><TextField value={values?.field_10} id={properties.field_10}   label={properties.field_10}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_10')} />   </div>
                    <div class="p-2"><TextField value={values?.field_11} id={properties.field_11}   label={properties.field_11}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_11')} />   </div>
                    <div class="p-2"><TextField value={values?.field_12} id={properties.field_12}  label={properties.field_12}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_12')} /> </div>
                   <div class="p-2"><TextField value={values?.field_13} id={properties.field_13} label={properties.field_13}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_13')} /> </div>
                   <div class="p-2"><TextField value={values?.field_14} id={properties.field_14}   label={properties.field_14}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_14')} />   </div>
                   <div class="p-2"><TextField value={values?.field_15} id={properties.field_15}   label= {properties.field_15}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_15')} />  </div>
                    <div class="p-2"><TextField value={values?.field_16} id={properties.field_16}   label={properties.field_16}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_16')} />   </div>
                    <div class="p-2"><TextField value={values?.field_17} id={properties.field_17}  label={properties.field_17}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_17')} /> </div>
                    </div>
                    <div class="col-6">
                    <div class="p-2"><TextField value={values?.field_18} id={properties.field_18}   label= {properties.field_18}  size="small" disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_18')} />  </div>
                    <div class="p-2"><TextField value={values?.field_19} id={properties.field_19}   label={properties.field_19}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_19')} />   </div>
                    <div class="p-2"><TextField value={values?.field_20} id={properties.field_20}   label={properties.field_20}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_20')} />   </div>
                    <div class="p-2"><TextField value={values?.field_21} id={properties.field_21}   label={properties.field_21}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_21')} />   </div>
                    <div class="p-2"><TextField value={values?.field_22} id={properties.field_22}   label= {properties.field_22}  size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_22')} />  </div>
                    <div class="p-2"><TextField value={values?.field_23} id={properties.field_23}   label={properties.field_23}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_23')} />   </div>
                    <div class="p-2"><TextField value={values?.field_24} id={properties.field_24}   label={properties.field_24}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_24')} />   </div>
                    <div class="p-2"><TextField value={values?.field_25} id={properties.field_25}   label={properties.field_25}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_25')} />   </div>
                    <div class="p-2"><TextField value={values?.field_26} id={properties.field_26}    label={properties.field_26}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_26')} /> </div>
                   <div class="p-2"><TextField value={values?.field_27} id={properties.field_27}    label={properties.field_27}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_27')} /> </div>
                   <div class="p-2"><TextField value={values?.field_28} id={properties.field_28}    label={properties.field_28}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_28')} />   </div>
                   <div class="p-2"><TextField value={values?.field_29} id={properties.field_29}    label={properties.field_29}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_29')} />   </div>
                    <div class="p-2"><TextField value={values?.field_30} id={properties.field_30}   label= {properties.field_30}  size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_30')} />  </div>
                    <div class="p-2"><TextField value={values?.field_31} id={properties.field_31}   label={properties.field_31}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_31')} />   </div>
                    <div class="p-2"><TextField value={values?.field_32} id={properties.field_32}   label={properties.field_32}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_32')} />   </div>
                    <div class="p-2"><TextField value={values?.field_33} id={properties.field_33}   label={properties.field_33}  size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_33')} />   </div>
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
                   {role ==="approver" &&
                  <TextField
                    fullWidth
                    variant='outlined'
                    select
                    id={properties.field_34}
                    label={properties.field_34}
                    renderValue={(value) => (value !== undefined ? value : 'Approval Status')}
                    sx={{ maxHeight:30, textAlign:"left"}}
                    value={values?.field_34} disabled={statusdisabled}  onChange={(e)=>handleChange(e.target.value,'field_34')}
                    size="small"
                    >
                    <MenuItem key={properties.waiting} value={properties.waiting}>{properties.waiting}</MenuItem>
                    <MenuItem key={properties.approve} value={properties.approve}>{properties.approve}</MenuItem>
                    <MenuItem key={properties.reject} value={properties.reject}>{properties.reject}</MenuItem>
                  </TextField> 
                  }
                  </div>
                <div class="p-2"><textarea disabled={statusdisabled} value={values?.comments}  id={properties.comments} label={properties.comments} rows='3' cols='55'   fullWidth size="small"  required  onChange={(e)=>handleChange(e.target.value,'comments')} ></textarea> </div> 
                </div>
              </div>
          </div>
      </div> 
    
  </div> <br></br>



  <div class="card">    
      <div class=" card-body">
           <div class="row text-right">
            <div class="col-md-12  text-right">
            {status !== "Approved" &&
                <>              
                <button type="button" class="btn btn-success rounded btn-sm"  onClick={handleEditSubmit}>Edit</button>
                <button type="button" class="btn btn-warning rounded btn-sm  ml-2" onClick={handleSubmit}>Submit</button>
                </>
            } 
            {status === "Approved" && 
              <button type="button" class="btn btn-success rounded btn-sm  ml-2" onClick={handleBackSubmit}>Back to Dashboard</button>
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





