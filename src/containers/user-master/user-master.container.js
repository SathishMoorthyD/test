import React,{useState,useEffect} from 'react'
import { fetchUser } from '../../services/login/login.service';
import {CustomTable} from '../../custom/custom-table/custom-table.container'
import { properties } from '../../components/UserMasterLabelProperties'

import { saveUserMaster } from '../../services/login/login.service'

export const UserMaster = (props) => {
  const {handleRouter} = props;  
  const rows = [{ username: '', email: '',roles:'', id:'' }];

  const rows1 = [
    { userName: 'Krishna', Email: 'krishna@gmail.com',Role:'technical' },
    { userName: 'Bala', Email: 'Bala@gmail.com',Role:'employee' },
    { userName: 'Ramar', Email: 'Ramr@gmail.com',Role:'technical' },
    { userName: 'Thiru', Email: 'thiru@gmail.com',Role:'manager' },
    { userName: 'shankar', Email: 'shankar@gmail.com',Role:'manager' },
    { userName: 'vignesh', Email: 'vignesh@gmail.com',Role:'technical' },
    { userName: 'ram', Email: 'ram@gmail.com',Role:'employee' },
    { userName: 'jagan', Email: 'jagan@gmail.com',Role:'manager' },
    { userName: 'thomas', Email: 'thomas@gmail.com',Role:'technical' },
    { userName: 'prabaa', Email: 'prabaa@gmail.com',Role:'technical' },
  ]

  const roledata = [
    { Id:1,roles:'approver' },
    { Id:2,roles:'admin' },
    { Id:3,roles:'user' },
  ]

  const roledata1 = [
    { Id:1,Role:'technical' },
    { Id:2,Role:'employee' },
    { Id:3,Role:'manager' },
   
  ]

  const [tableRowData, setTableRowData] = useState({Records:rows})
  
  const [tableColumnData, setTableColumnData] = useState([
    {field:'sl',headerName:'sl',cellRenderer(params){
        return parseInt(params.node.id,10)+1;}},
        
        {field:'username',headerName:'User Name'},
        {field:'email',headerName:'Email'},
        {field:'roles',headerName:'Role'},
        {field:'Operation',headerName:'Operation',cellRenderer:'operationIconRenderer'},
        ])

  let [values, setValues] = useState({
    active: true,
    email: "",
    password: "",
    username: "",
    roles:'',
    inputState: {readOnly:false}
  });

  const handleChange = (event,field) => {
    setValues({ ...values, [field]: event });
  };

  const handleSubmit=(event )=>{
    event.preventDefault();
    console.log(values)
    const userAdd = saveUserMaster(values)
    userAdd.then(function (val)
    {
      alert(val.data);
      if (val.status === 200)
      {
          setValues({
          active: false,
          email: "",
          password: "",
          username: "",
          roles:'',
          inputState: {readOnly:false}
        })
        handleClose()
        // showToasterSubject.next({type:'success',value:'User Master Added successfully'})
        fetchData();
      }
    })
  }
  
  const fetchData = ()=>{
    const responseData = fetchUser();
    responseData.then(function (dataList) {setTableRowData({Records: dataList})});
    // await setTableRowData(rows)
    
   }
// const createTableData=()=>{
//     setTableColumnData()
// }


useEffect(() => {
//createTableData()
//Required to set menu highlight appropriately
handleRouter(6);

fetchData()
console.log("user-master userEffect..", tableRowData);
}, []);

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div class="p-2 container-sm">
        <div class="col-5">
          <span class="fw-bold"><h2>User Management</h2></span>
          </div>
      <div class="card">
    
    <CustomTable tableRowData={tableRowData?.Records}values={values} roledata ={roledata} handleSubmit={handleSubmit} handleChange={handleChange} properties={properties} tableColumnData={tableColumnData} open={open} onAddClick={handleClickOpen} handleClose={handleClose}  AddLabel={'Add User'} isPaginationVisible={false} fetchData={fetchData}/>
</div>
   
  </div>
  )
}
