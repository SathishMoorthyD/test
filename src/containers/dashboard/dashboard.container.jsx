import React, { Component }  from 'react';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../App.css';
import Display  from '../../custom/custom-table/custom-table-display';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import SearchIcon from '@mui/icons-material/Search';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { dashboardProperties } from '../../components/dashboardLabel';
import { fetchAllData, getDashByDate } from '../../services/dashboard/dashboard.service';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputBase from '@material-ui/core/InputBase';
// import InputLabel from '@mui/material/InputLabel';
// import Dropdown from 'react-mui-multiselect-dropdown'
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from '@material-ui/core/NativeSelect';
import { Hidden, TextField } from '@mui/material';
import { id } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { padding } from '@mui/system';


export default function DashboardComponent(){

  let [dateValue, setDateValue] = useState(new Date())
  let [records, setRecords] = useState([])
  let [records1, setRecords1] = useState([])
  let [prevRecords, setPrevRecords] = useState([])
  let [values, setValues] = useState({
    records: [],
    records1: [],    
    shift:'',
    section:'',
    userId:'',
    startdate:'',
    enddate:'',
    line:'',  
  });
  let reqDashboard = {userId: '', date: ''};
  //let appliedFilter = {line: '', shift: ''};
  let [line, setLine] = useState('Line'); 
  let [shift, setShift] = useState('Shift'); 

  const handleChange = (event,field) => {
    setValues({ ...values, [field]: event });
  };

  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    }
  }
  // const  handleDateRangeChange= (event) => {
  //         console.log("date"+event.target.value);
    
  //         // var date=new Date(event.target.value)
  //         var date=event.target.value
  //         console.log("End date"+date);
  //       // this.setState({daterange:event.target.value});
  //       setRecords1([])
  //       let arr=[];
  //     for(var j=0;j<records.length;j++){
  //             console.log("cccc",  records[j].date.split(" ")[0]);
  //             var temp=records[j].date.split(" ")[0].trim()
  //             var temp1=temp.split("-");
  //         // var checkDate=new Date(temp1[2], temp1[1],temp1[0]);           
  //         // console.log("checkdate",checkDate)  
  //         // console.log(checkDate.getTime() ," ",date.getTime())       ;
  //         var checkDate=temp1[2]+"-"+temp1[1]+"-"+temp1[0]
  //         if (checkDate == date) {            
  //           console.log('date is between the 2 dates' +checkDate);
  //           arr.push(records[j]);
  //           }
  //         } console.log("records1 ",arr)
  //         setRecords1(arr);
  //     }
        
      const  handleDateChange= (inDateValue) => {
        setDateValue(new Date(inDateValue))
        
        //Refresh dataset on date change
        getData();
      }

      const handleLineChange= (event) => {
        setLine(event.target.value);
    }

  //  const handleLineChange1= (event) => {
  //     setLine(event.target.value);
  //     console.log("date" + line);
     
  //     let arr=[];
  //     //setRecords1([])
  //     if (event.target.value==="Select")
  //     { setRecords1((records1.length > 0)?records1: records);}
  //     else{
  //           // for(var i=0;i<records.length;i++){
  //           //   console.log(records[i].line)
  //           //   if(records[i].line==event.target.value){
  //           //     arr.push(records[i]);
  //           //   }
  //           // }
  //           // setRecords1(arr);
  //           appliedFilter.line = line;
  //           appliedFilter.shift = shift;
  //           setRecords1(filteredDataByLine(records, appliedFilter));
  //           }
  // }

  const filterDataByLine = (dataList) =>
  {
    console.log(line);
    if (line === 'Line' || line === 'Select')
      return dataList;
    else
    {
      const filteredRecords = dataList.filter(
      (record) => (record.line === line)
      );
      console.log(filteredRecords);
      return filteredRecords;
    }
  }

  const filterDataByShift = (dataList) =>
  {
    console.log(shift);
    if (shift === 'Shift' || shift === 'Select')
      return dataList;
    else
    {
      const filteredRecords = dataList.filter(
      (record) => (record.shift === shift)
      );
      console.log(filteredRecords);
      return filteredRecords;
    }
  }

  // const filteredDataByLine = (dataList, inFilter) => {
  //   console.log(inFilter);
  //   const filteredRecords = dataList.filter(
  //   (record) => ((inFilter.shift !== 'Shift' && record.shift === inFilter.shift && record.line === inFilter.line) 
  //               || (inFilter.shift === 'Shift' && record.line === inFilter.line))
  //   );
  //   console.log(filteredRecords);
  //   return filteredRecords;};
  
  // const filteredDataByShift = (dataList, inFilter) => {
  //   console.log(inFilter);
  //   const filteredRecords = dataList.filter(
  //   (record) => ((inFilter.line !== 'Line' && record.shift === inFilter.shift && record.line === inFilter.line) 
  //                 || (inFilter.line === 'Line' && record.shift === inFilter.shift))
  //   );
  //   console.log(filteredRecords);
  //   return filteredRecords;};
    
    const handleShiftChange= (event) => {
      setShift(event.target.value);
    }

//   const handleShiftChange1= (event) => {
//     setShift(event.target.value);
//     console.log("handleShiftChange "+ {shift});
//     // let arr=[]  
//     // setRecords1([])
//     if (event.target.value==="Select")
//     { setRecords1((records1.length > 0)?records1: records);}
//     else{
//         // for(var i=0;i<records.length;i++){
          
//         //   if(records[i].shift==event.target.value){
//         //     console.log("Inside for",records[i].shift)
//         //     arr.push(records[i]);
//         //   }
//         // }
//         // setRecords1(arr);
//         appliedFilter.line = {line};
//         appliedFilter.shift = {shift};
//         setRecords1(filteredDataByShift(records, appliedFilter));
//       }
// }
  
useEffect(() => {
  if (line === 'Line' && shift === 'Shift') 
    getData();

  setRecords1(filterDataByShift(filterDataByLine(records)));
}, [line, shift])

const getData = () => {
  reqDashboard.userId = localStorage.getItem("userId");
  reqDashboard.date = moment(dateValue).format('DD-MM-YYYY');
  console.log("Dashboard getData: reqDashboard date value is " + reqDashboard.date);

  //const data1 =  fetchAllData();
  setRecords([]);
  setRecords1([]);    
  const data1 =  getDashByDate(reqDashboard);    
  data1.then(function(val) {
    // console.log("val",val);
    setRecords(val)      
    setRecords1(val)      
});
// console.log("records",records)
}
 
  return (
    <div style={{marginTop:20}}>
  
  <div class="container">
        <div class="row justify-content-end">
          <div class="col-5">
          <span class="fw-bold"><h2>Dashboard</h2></span>
          </div>
            <div class="col-2" > 
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date"
                      value={dateValue}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
              </div>
            <div class="col-2" > 
                    <FormControl fullWidth>
                    <TextField
                      variant='filled'
                      select
                      id="simple-select"
                      label="Line"
                      displayEmpty
                      renderValue={(value) => (value !== undefined ? value : 'Line')}
                      sx={{ maxHeight:30,borderRadius: '16px', textAlign:"center"}}
                      onChange={handleLineChange}
                      // size="small" 
                        >
                      <MenuItem key={"Select"} value={"Select"}>Select</MenuItem>
                      <MenuItem key={dashboardProperties.lineA} value={dashboardProperties.lineA}>{dashboardProperties.lineA}</MenuItem>
                      <MenuItem key={dashboardProperties.lineB} value={dashboardProperties.lineB}>{dashboardProperties.lineB}</MenuItem>
                      <MenuItem key={dashboardProperties.lineC} value={dashboardProperties.lineC}>{dashboardProperties.lineC}</MenuItem>
                    </TextField>
                      {/* <Select
                      labelId="simple-select-label"
                      id="simple-select"
                      label="Line"
                      displayEmpty
                      renderValue={(value) => (value !== undefined ? value : 'Line')}
                      sx={{ maxHeight:30,borderRadius: '16px', textAlign:"center"}}
                      onChange={handleLineChange}
                      // size="small" 
                        >
                      <MenuItem value={"Select"}>Select</MenuItem>
                      <MenuItem value={dashboardProperties.lineA}>{dashboardProperties.lineA}</MenuItem>
                      <MenuItem value={dashboardProperties.lineB}>{dashboardProperties.lineB}</MenuItem>
                      <MenuItem value={dashboardProperties.lineC}>{dashboardProperties.lineC}</MenuItem>
                    </Select>      */}
                </FormControl>
                </div> 
            <div class="col-2" >                   
            <div class="fontline">
            <FormControl fullWidth>                      
                    <TextField 
                      variant='filled'
                      select
                      id="select-shift"
                      label="Shift"
                      displayEmpty
                      renderValue={(value) => (value !== undefined ? value : 'Shift')}
                      sx={{ maxHeight:30,borderRadius: '16px', textAlign:"center"}}
                      onChange={handleShiftChange}
                      // size="small" 
                        >
                      <MenuItem key={"Select"} value={"Select"}>Select</MenuItem>    
                      <MenuItem key={dashboardProperties.shift1} value={dashboardProperties.shift1}>{dashboardProperties.shift1}</MenuItem>
                      <MenuItem key={dashboardProperties.shift2} value={dashboardProperties.shift2}>{dashboardProperties.shift2}</MenuItem>
                      <MenuItem key={dashboardProperties.shift3} value={dashboardProperties.shift3}>{dashboardProperties.shift3}</MenuItem>
                    </TextField>
                      {/* <Select 
                      labelId="simple-select-shift"
                      id="select-shift"
                      value={dashboardProperties.shift}
                      label="Shift"
                      displayEmpty
                      renderValue={(value) => (value !== undefined ? value : 'Shift')}
                      sx={{ maxHeight:30,borderRadius: '16px', textAlign:"center"}}
                      onChange={handleShiftChange}
                      // size="small" 
                        >
                      <MenuItem value={dashboardProperties.shift1}>{dashboardProperties.shift1}</MenuItem>
                      <MenuItem value={dashboardProperties.shift2}>{dashboardProperties.shift2}</MenuItem>
                      <MenuItem value={dashboardProperties.shift3}>{dashboardProperties.shift3}</MenuItem>
                    </Select>                          */}
                </FormControl>
                </div>
            </div>
        </div> 
      </div>
 
      <div class="container">
    {/* <div class="card-header">General Details</div> */}
      {/* <div class="card-body"> */}
            {/* <div class="col-6 "> */}
            {/* <div class="row table-header p-1 rounded fw-bold">
            {/* <div class="p-2 col">             
                 <lablel>Date</lablel>
                </div> */}
                {/* <div class="p-2 col">             
                 <lablel> Section</lablel>
                </div>
                <div class="p-2 col">                
                <lablel>Shift</lablel>
                </div>
                <div class="p-2 col">                
                <lablel>Line</lablel>
                </div>
                
                <div class="p-2 col">                
                <lablel>Status</lablel>
                </div>
                <div class="p-2 col">                
                <lablel></lablel>
                </div> */}
            {/* </div>       */}
         {/* </div>  */}
      

 
    {/* <table class='table table-hover'> */} <br></br><br></br>
    <table class="table table-hover table-border">
    {/* <MDBTableHead color="bg-light" textWhite> */}
        <thead class="bg-login-container p-4 m-4 fw-bold">     
        <tr> 
          {/* <th></th>    
        //   <th></th> */}
        {/* <th class="p-1 col-1" >Date</th> */}
            <th class="p-2 col-3 fw-bold">Section</th>
           <th class="p-2 col-3 fw-bold">Shift</th>
           <th class="p-2 col-3 fw-bold">Line</th>
           <th class="p-2 col-2 fw-bold" style={{textAlign: 'center'}}>Status</th>
           <th class="p-2 col-1 fw-bold"></th>
        </tr>
        </thead>
      {/* </MDBTableHead> */}
      <tbody>
	    {records1.map(rec=><Display records={rec}/>)}
      {/* </table> */}
      </tbody>
      </table >
      </div>        
    </div>
  )
  }
// }