import React,{useState,useEffect} from 'react'
import { fetchUser } from '../../services/login/login.service';
import {CustomTable} from '../../custom/custom-table/custom-table.container'
import { properties } from '../../components/UserMasterLabelProperties'

import { saveUserMaster } from '../../services/login/login.service'

export const UserMaster = () => {
  const rows = [
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
    { Id:1,Role:'technical' },
    { Id:2,Role:'employee' },
    { Id:3,Role:'manager' },
   
  ]

  const [tableRowData, setTableRowData] = useState({Records:rows})
  const [tableColumnData, setTableColumnData] = useState([
    {field:'sl',headerName:'sl',cellRenderer(params){
        return parseInt(params.node.id,10)+1;}},
        
        {field:'userName',headerName:'User Name'},
        {field:'Email',headerName:'Email'},
        {field:'Role',headerName:'Role'},
        {field:'Operation',headerName:'Operation',cellRenderer:'operationIconRenderer'},
        ])
  let [values, setValues] = useState({
    active: true,
  email: "",
  password: "",
  username: "",
  role:'',
    inputState: {readOnly:false}
  
  });
  const handleChange = (event,field) => {
    setValues({ ...values, [field]: event });
  };
  const handleSubmit=async (event )=>{
    event.preventDefault();
    console.log(values)
      await saveUserMaster(values)
    handleClose()
    // showToasterSubject.next({type:'success',value:'User Master Added successfully'})
    setValues({
      active: false,
    email: "",
    password: "",
    username: "",
    role:'',
      inputState: {readOnly:false}
    
    })
    
  }
  
  const fetchData = async()=>{
    const response = await fetchUser()
    setTableRowData(response.data)
    // await setTableRowData(rows)
    
   }
// const createTableData=()=>{
//     setTableColumnData()
// }


useEffect(() => {
//createTableData()
//fetchData()
});
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
    
    <CustomTable tableRowData={tableRowData?.Records}values={values} roledata ={roledata} handleSubmit={handleSubmit} handleChange={handleChange} properties={properties} tableColumnData={tableColumnData} open={open} onAddClick={handleClickOpen} handleClose={handleClose}  AddLabel={'Add User'} isPaginationVisible={false}/>
</div>
   
  </div>
  )
}
