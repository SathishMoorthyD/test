import React  from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CustomTable } from '../../custom/custom-table/custom-table.container';
import {useNavigate} from 'react-router-dom'
export function JRMasterContainer ()  {
  let navigate = useNavigate();
    const rows = [
        { id: '1', label: 'Name',testing:'new' },
  { id: '2', label: 'ISO\u00a0Code',testing:'old'},
  {
    id: '3',
    label: 'Population',
    testing:'medium'
  },
  {
    id: '4',
    label: 'Size\u00a0(km\u00b2)',testing:'fast'
  },
  {
    id: '5',
    label: 'Density',testing:'slow'
  }
      ]
    
      const [tableRowData, setTableRowData] = useState({Records:rows})
      const [tableColumnData, setTableColumnData] = useState([
        {field:'sl',headerName:'sl',cellRenderer(params){
            return parseInt(params.node.id,10)+1;}},
            {field:'Edit',headerName:'Edit',cellRenderer:'editIconRenderer'},
            {field:'label',headerName:'Label Name'},
            {field:'testing',headerName:'testing Name'}
        
            ])
const onEditClick=(params)=>{
  console.log(params)
  navigate(`/jrmaster/${params.id}`)
}
      const fetchData = async()=>{
       
       // await setTableRowData(rows)
       
      }
// const createTableData=()=>{
//     setTableColumnData()
// }


useEffect(() => {
  //createTableData()
 
});


  return (
    <div style={{marginTop:20}}>
    
        <CustomTable tableRowData={tableRowData?.Records} tableColumnData={tableColumnData} onEditClick={onEditClick}/>
    </div>
  )
}




