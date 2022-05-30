import React, { Component }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import {fetchAllPaper,fetchPaperByPaperId,DeletePaperById,savePaper} from '../../services/MenuD/menuD.service'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {TextField} from '@mui/material';
import { properties } from '../../components/MenuCLabelProperties';
import { useLocation } from "react-router-dom";

  export default function MenuDComponent(){

 
  const search = useLocation().search;
  const [disabled, setDisabled] = useState(false)
  const [role,setRole] =useState('Manager')
  let [token, setToken] = useState('')
  const [statusdisabled, setStatusDisabled] = useState(false)
  let [data1, setData1] = useState()
  let [values, setValues] = useState({
    records: [],
    role:'technician',
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
    console.log( "inside menu b menu id",id );  
    const token = localStorage.getItem('AccessToken');
      if( localStorage.getItem('role')!=undefined) setRole(localStorage.getItem('role'))
      console.log("role", values.role, role)            
      if (token)  setToken(token);
    if(id  != null) {
      const data =  fetchAllPaper();    
            data.then(function(val) {          
                  setTimeout(() => {
                    console.log("val",val);
                    // setData1(val) 
                    // console.log(data1)   
                    for(var i=0;i<val.length;i++){
                      if(val[i].paperid==id){
                      setValues(val[i])       
                      }              
                    }       
                  }, 2000);            
           });
  
          // var obj=document.getElementsByTagName("input");
          // for(var i=0;i<obj.length;i++){
          //   console.log("inside for")
          //   obj[i].readOnly=true;
          // }                
      
          setDisabled(true)
        }   
       
  }, [])
  
   
   const handleEditSubmit= (e) => {
      e.preventDefault();
     
      // this.state = { inputState: { readOnly: false }};
      // var obj=document.getElementsByTagName("input");
      // for(var i=0;i<obj.length;i++){
      //   // console.log("inside for")
      //   obj[i].readOnly=false;
      // }
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
            if(values.comments==undefined)alert('Please fill the comments field')
            else{
            console.log("field1",values.field_1)
            const data =  savePaper(JSON.stringify(values));    
            data.then(function(val) {    
            console.log(val)
            });
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
          const data =  savePaper(JSON.stringify(values));    
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
          if(values.comments==undefined){ setData1("** Please fill the comments")}
          else{
          console.log("field1",values.field_1)
          const data =  DeletePaperById(JSON.stringify(values.field_1));    
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
                    <TextField id={properties.date} value={values.date}  label= {properties.date} disabled={disabled} size="small"  fullWidth onChange={(e)=> handleChange(e.target.value,'date')} />
                    </div>
                    <div class="p-1">
                      {/* <TextField id={properties.line} value={values.line}  label={properties.line} size="small" disabled={disabled} fullWidth  onChange={(e)=>handleChange(e.target.value,'line')} />    */}
                      <select label={properties.line} class="w-100 form-control form-control-sm rounded"  value={values.line} disabled={disabled}  onChange={(e)=>handleChange(e.target.value,'line')} >
                        <option value={properties.lineA}>{properties.lineA}</option>
                        <option value={properties.lineB}>{properties.lineB}</option>
                        <option value={properties.lineC}>{properties.lineC}</option>
                        <option value={properties.lineD}>{properties.lineD}</option>
                        <option value={properties.lineE}>{properties.lineE}</option>  
                      </select>
                      </div>
                </div>
                <div class="col-6">
                   <div class="p-1">
                     {/* <TextField id={properties.shift} value={values.shift} label={properties.shift}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'shift')} />  */}
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
                <div class="p-2"><TextField  value={values?.field_5}  id={properties.field_5}  label={properties.field_5}    size="small" disabled={disabled} fullWidth onChange={(e)=>handleChange(e.target.value,'field_5')} /> </div>                 
                <div class="p-2"><textarea disabled={disabled} value={values?.comments}  id={properties.comments} label={properties.comments} rows='3' cols='55'   fullWidth size="small"  required  onChange={(e)=>handleChange(e.target.value,'comments')} ></textarea> </div> 
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
                {role=="Manager" && 
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

