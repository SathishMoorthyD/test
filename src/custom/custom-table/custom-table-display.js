import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute } from 'react-router-dom';
// import history from './history'

import { useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Link } from '@mui/material';
import { NavLink } from 'react-bootstrap';
class Display extends Component {
    //IMPLEMENT YOUR CODE HERE 
    constructor(props){
super(props);

    }
    
    enMenu = (menuid) => {
        let apiMenu = "Menu";
        switch(menuid)
        {
          case "CPP":
          case "MenuA":
            apiMenu = "MenuA";
            break;
          case "FIN":
          case "MenuB":
            apiMenu = "MenuB";
            break;
          case "JRM":
          case "MenuC":
            apiMenu = "MenuC";
            break;
          case "PAPER":
          case "MenuD":
            apiMenu = "MenuD";
            break;
          case "PULP":
          case "MenuE":
            apiMenu = "MenuE";
            break;
        }
        return apiMenu;
    }
    
    handleSubmit = () => {
      
     console.log("table submit"+this.props.records.approval_status)
    //  let navigate = useNavigate(); 
    console.log("field_id "+this.props.records.menu_id)
    var path="/"+this.enMenu(this.props.records.menu_name)+"/?menu_id="+this.props.records.menu_id;
    // navigate(path);
    window.location.href = path;
   
    };
  
    
  render()
  {
    let classStatus="";
    console.log("status",this.props.records.approval_status);
    
    if (this.props.records.approval_status==="Approved"){classStatus="badge rounded-pill bg-approve-status  p-2 m-1";
    // console.log("inside Approved")    
    }
    else if (this.props.records.approval_status==="Rejected") {classStatus="badge rounded-pill bg-reject-status  p-2 m-1";
    // console.log("inside rejected")    
    }
    else { classStatus="badge rounded-pill bg-waiting-status p-2 m-1";
      // console.log("inside waiting")    
    }
      return(
        <>         
          
              <tr>      
               <td class="p-3 col-3" style={{fontSize: ".8rem"}}><span className=''>{this.props.records.menu_name}</span></td>               
               <td class="p-3 col-3" style={{fontSize: ".8rem"}}><span>{this.props.records.shift}</span></td>
               <td class="p-3 col-3" style={{fontSize: ".8rem"}}><span>{this.props.records.line}</span></td>             
               <td class="p-1 col-2" style={{fontSize: ".9rem"}}><span class={classStatus}>{this.props.records.approval_status}</span></td>           
               <td class="p-1 col-1" style={{fontSize: ".8rem"}}><button class="btn btn-link btn-sm fonticon m-0"  onClick={this.handleSubmit}  > <i><ArrowCircleRightOutlinedIcon onclick={this.handleSubmit}/></i> </button></td>
              </tr>
            
        </>
      );
  }	 	  	  		  	     	     	       	 	
}
 
export default Display;

