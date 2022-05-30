import React, { Component }  from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import {DeleteFinishingById, fetchAllFinishing, saveFinishing} from '../../services/MenuB/menuB.service.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {TextField,MenuItem,Select} from '@mui/material';
import { properties } from '../../components/MenuBLabelProperties';
import { useLocation } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import {useNavigate} from 'react-router-dom'

  export default function MenuBComponent(){
    let navigate = useNavigate();
    const [disabled, setDisabled] = useState(false)
    
  const [role,setRole] =useState('Manager')
  const search = useLocation().search;
  
  const [statusdisabled, setStatusDisabled] = useState(false)
  let [data1, setData1] = useState()
  let [token, setToken] = useState('')
  let [values, setValues] = useState({
    records: [],
    role:'Manager',
    shift:'',
    section:'',
    userId:'',
    date:'',
    line:'',
    bool:true,
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
    comments:'',
    inputState: {readOnly:false}
  
  });
  const handleChange = (event,field) => {
    setValues({ ...values, [field]: event });
  };
 

useEffect(() => {
  const id = new URLSearchParams(search).get('menu_id');
  console.log( "inside menu b user id",id );  
  const token = localStorage.getItem('AccessToken');
      if( localStorage.getItem('role')!=undefined) setRole(localStorage.getItem('role'))
      console.log("role", values.role, role)            
      if (token)  setToken(token);
  if(id  != null) {
    const data =  fetchAllFinishing();    
          data.then(function(val) {          
                setTimeout(() => {
                  console.log("val",val);
                  // setData1(val) 
                  // console.log(data1)   
                  for(var i=0;i<val.length;i++){
                    if(val[i].finishingid==id){
                    setValues(val[i])       
                    }              
                  }       
                }, 500);            
         });

        var obj=document.getElementsByTagName("input");
        for(var i=0;i<obj.length;i++){
          console.log("inside for")
          obj[i].readOnly=true;
        }                
    
        setDisabled(true)
        setStatusDisabled(true)
      }   
      
}, [])

 
 const handleEditSubmit= (e) => {
    e.preventDefault();

    console.log("eedit");
    setDisabled(false)   
    if(values.role=="Manager") setStatusDisabled(false)
    else  setStatusDisabled(true)
 
  }
  
  const handleSubmit= (e) => {
    e.preventDefault();
    localStorage.setItem('AccessToken',token)
    localStorage.setItem('role',role)
    // eslint-disable-next-line no-restricted-globals
        if( confirm('Do you want to submit')){

          console.log("comments",values.comments);
          if(values.comments==undefined){
            setData1("** Please fill the comments")
            
          }
          else{
          console.log("field1",values.field_1)
          // const data =  saveFinishing(JSON.stringify(values));    
          // data.then(function(val) {    
          // console.log(val)
          // });
          navigate('/dashboard')
        }
      }
  }

  const handleApproved= (e) => {
    e.preventDefault();
    localStorage.setItem('AccessToken',token)
    localStorage.setItem('role',role)
     // eslint-disable-next-line no-restricted-globals
        if( confirm('Do you want to Approve')){
          console.log("comments",values.comments);
          if(values.comments==undefined)alert('Please fill the comments field')
          else{
        console.log("field1",values.field_1)
        const data =  saveFinishing(JSON.stringify(values));    
        data.then(function(val) {    
        console.log(val)
        });
      }
    }
  }
  const handleRejected= (e) => {
    e.preventDefault();  

    localStorage.setItem('AccessToken',token)
    localStorage.setItem('role',role)
    console.log("comments",values.comments)
     // eslint-disable-next-line no-restricted-globals
      if( confirm('Do you want to Reject')){
        console.log("comments",values.comments);
        if(values.comments==undefined)alert('Please fill the comments field')
        else{
        console.log("field1",values.field_1)
        const data =  DeleteFinishingById(JSON.stringify(values.field_1));    
        data.then(function(val) {    
        console.log(val)
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
                    <TextField id={properties.date}  value={values.date}  label= {properties.date} disabled={disabled}  size="small"  fullWidth onChange={(e)=> handleChange(e.target.value,'date')} />
                    {/* <input id={properties.date} value={values.date}  label= {properties.date}    onChange={(e)=> handleChange(e.target.value,'date')} /> */}
                    
                    </div>
                    <div class="p-1">
                    {/* <Select  label={properties.line} size="small" inputProps={{ readOnly: false, }}  class="w-100" fullwidth onChange={(e)=>handleChange(e.target.value,'line')} >
                        <MenuItem value={properties.lineA}>{properties.lineA}</MenuItem>
                        <MenuItem value={properties.lineB}>{properties.lineB}</MenuItem>
                        <MenuItem value={properties.lineC}>{properties.lineC}</MenuItem>
                        <MenuItem value={properties.lineD}>{properties.lineD}</MenuItem>
                        <MenuItem value={properties.lineE}>{properties.lineE}</MenuItem>  
                        </Select> */}
                      <select label={properties.line} class="w-100 form-control form-control-sm rounded"  value={values.line} disabled={disabled}  onChange={(e)=>handleChange(e.target.value,'line')} >
                        <option value={properties.lineA}>{properties.lineA}</option>
                        <option value={properties.lineB}>{properties.lineB}</option>
                        <option value={properties.lineC}>{properties.lineC}</option>
                        <option value={properties.lineD}>{properties.lineD}</option>
                        <option value={properties.lineE}>{properties.lineE}</option>  
                      </select>
                      {/* <TextField id={properties.line} value={values.line}  label={properties.line} size="small" inputProps={{ readOnly: false, }} fullWidth  onChange={(e)=>handleChange(e.target.value,'line')} />    */}
                      {/* <input id={properties.line} value={values.line}  label={properties.line} onChange={(e)=>handleChange(e.target.value,'line')} />    */}
                      
                      </div>
                </div>
                <div class="col-6">
                   <div class="p-1"><TextField id={properties.section} value={values.section} label={properties.section}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'section')} /> </div>
                   <div class="p-1">
                     {/* <TextField id={properties.shift} value={values.shift} label={properties.shift}    size="small" inputProps={{ readOnly: false, }} fullWidth onChange={(e)=>handleChange(e.target.value,'shift')} />  */}
                     <select label={properties.shift} value={values.shift} class="w-100 form-control form-control-sm rounded"  disabled={disabled}  onChange={(e)=>handleChange(e.target.value,'shift')} >
                        <option value={properties.shift1}>{properties.shift1}</option>
                        <option value={properties.shift2}>{properties.shift2}</option>
                        <option value={properties.shift3}>{properties.shift3}</option>                       
                      </select>
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
                    <div class="p-2"><TextField  value={values?.field_1} id={properties.field_1}   label= {properties.field_1}  size="small"  disabled={disabled}  fullWidth onChange={(e)=> handleChange(e.target.value,'field_1')} />  </div>
                    <div class="p-2"><TextField  value={values?.field_2} id={properties.field_2}   label={properties.field_2}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_2')} />   </div>
                    <div class="p-2"><TextField  value={values?.field_3} id={properties.field_3}   label={properties.field_3}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_3')} />   </div>
                    <div class="p-2"><TextField value={values?.field_4} id={properties.field_4}   label={properties.field_4}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_4')} />   </div>
                </div>
                <div class="col-6">
                   <div class="p-2"><TextField  value={values?.field_5}  id={properties.field_5}  label={properties.field_5}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_5')} /> </div>
                   <div class="p-2"><TextField value={values?.field_6} id={properties.field_6} label={properties.field_6}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_6')} /> </div>
                   <div class="p-2"><TextField value={values?.field_7} id={properties.field_7}   label={properties.field_7}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_7')} />   </div>
                   <div class="p-2"><TextField value={values?.field_8} id={properties.field_8}   label={properties.field_8}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_8')} />   </div>
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
                    <div class="p-2"><TextField value={values?.field_9} id={properties.field_9}   label= {properties.field_9}  size="small"  disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_9')} />  </div>
                    <div class="p-2"><TextField value={values?.field_10} id={properties.field_10}   label={properties.field_10}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_10')} />   </div>
                    <div class="p-2"><TextField value={values?.field_11} id={properties.field_11}   label={properties.field_11}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_11')} />   </div>
                 
                </div>
                <div class="col-6">
                   <div class="p-2"><TextField value={values?.field_12} id={properties.field_12}  label={properties.field_12}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_12')} /> </div>
                   <div class="p-2"><TextField value={values?.field_13} id={properties.field_13} label={properties.field_13}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_13')} /> </div>
                   <div class="p-2"><TextField value={values?.field_14} id={properties.field_14}   label={properties.field_14}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_14')} />   </div>
                  
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
                    <div class="p-2"><TextField value={values?.field_15} id={properties.field_15}   label= {properties.field_15}  size="small"  disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_15')} />  </div>
                    <div class="p-2"><TextField value={values?.field_16} id={properties.field_16}   label={properties.field_16}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_16')} />   </div>
                                 
                </div>
                <div class="col-6">
                   <div class="p-2"><TextField value={values?.field_17} id={properties.field_17}  label={properties.field_17}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_17')} /> </div>
                                
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
                    <div class="p-2"><TextField value={values?.field_18} id={properties.field_18}   label= {properties.field_18}  size="small"  disabled={disabled} fullWidth onChange={(e)=> handleChange(e.target.value,'field_18')} />  </div>
                    <div class="p-2"><TextField value={values?.field_19} id={properties.field_19}   label={properties.field_19}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_19')} />   </div>
                    <div class="p-2"><TextField value={values?.field_20} id={properties.field_20}   label={properties.field_20}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_20')} />   </div>
                    <div class="p-2"><TextField value={values?.field_21} id={properties.field_21}   label={properties.field_21}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_21')} />   </div>
                    <div class="p-2"><TextField value={values?.field_22} id={properties.field_22}   label= {properties.field_22}  size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_22')} />  </div>
                    <div class="p-2"><TextField value={values?.field_23} id={properties.field_23}   label={properties.field_23}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_23')} />   </div>
                    <div class="p-2"><TextField value={values?.field_24} id={properties.field_24}   label={properties.field_24}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_24')} />   </div>
                    <div class="p-2"><TextField value={values?.field_25} id={properties.field_25}   label={properties.field_25}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_25')} />   </div>
                </div>
                <div class="col-6">
                   <div class="p-2"><TextField value={values?.field_26} id={properties.field_26}    label={properties.field_26}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_26')} /> </div>
                   <div class="p-2"><TextField value={values?.field_27} id={properties.field_27}    label={properties.field_27}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_27')} /> </div>
                   <div class="p-2"><TextField value={values?.field_28} id={properties.field_28}    label={properties.field_28}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_28')} />   </div>
                   <div class="p-2"><TextField value={values?.field_29} id={properties.field_29}    label={properties.field_29}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_29')} />   </div>
                    <div class="p-2"><TextField value={values?.field_30} id={properties.field_30}   label= {properties.field_30}  size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_30')} />  </div>
                    <div class="p-2"><TextField value={values?.field_31} id={properties.field_31}   label={properties.field_31}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_31')} />   </div>
                    <div class="p-2"><TextField value={values?.field_32} id={properties.field_32}   label={properties.field_32}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_32')} />   </div>
                    <div class="p-2"><TextField value={values?.field_33} id={properties.field_33}   label={properties.field_33}  size="small"  disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'field_33')} />   </div>
              
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
              
                <div class="col-6">
                   <div class="p-2"><TextField value={values?.field_34} id={properties.field_34}  label={properties.field_34}    size="small"  disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_34')} /> </div>
                                
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
                <div class="col-6">
                   <div class="p-2"><TextField value={values?.field_35}  id={properties.field_35}  label={properties.field_35}    size="small"  disabled={statusdisabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_35')} /> </div>
                   {/* <div class="p-2"><TextField class="" value={values?.comments}  id={properties.comments}  label={properties.comments}    size="large" inputProps={{ readOnly: false, }} fullWidth onChange={(e)=>handleChange(e.target.value,'comments')} /> </div> */}
                   <div class="p-2"><textarea placeholder="Please enter the comments" disabled={statusdisabled} value={values?.comments}  id={properties.comments} label={properties.comments} rows='3' cols='60'   fullWidth size="small"  required  onChange={(e)=>handleChange(e.target.value,'comments')} ></textarea> </div>             
                   {/* <div class="p-2"> <span class="text-danger">{data1}</span></div>                          */}
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
                {role=="Manager" && 
                    <>                   
                <button type="button" class="btn btn-danger rounded btn-sm ml-2" onClick={handleRejected} >Reject</button>               
                <button type="button" class="btn btn-primary rounded btn-sm " onClick={handleApproved} >Approved</button>
                </>
              }
            
            </div>        
            </div>
      </div>     
    </div>


  </div>
  
  )
 }





