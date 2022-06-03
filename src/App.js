import React,{useState,useEffect} from 'react'
import './App.css';
import { AppRouter } from './app-router.js';
import { showToasterState } from './services/toastr/toaster.service.js';
import { showLoaderCountState } from './services/api.service.js'
import { toast,ToastContainer } from 'react-toastify';
import Header from './containers/header/header.js'
import { Loader } from './containers/loader/loader.container';
import { Login } from './containers/login/login.container';
function App() {
  const [showLoader, setShowLoader] = useState(0),
  [isReadyToLoad,setIsReadyToLoad] = useState(false)

  useEffect(() => {
    setIsReadyToLoad(true)
    showLoaderCountState.subscribe((showLoadCount)=>{
      setShowLoader(showLoadCount)
    })
  showToasterState.subscribe((toaster)=>{
    if(toaster.type === 'error'){
toast.error(toaster.value)
    }
    if(toaster.type === 'error'){
      toast.error(toaster.value) 
    }
 
  })
    
  }, [])
  
  return (
    <div  backgroundColor="grey">
     {/* <Loader  isOpen={showLoader}></Loader > */}
     <ToastContainer />
      {isReadyToLoad && <div className="app-header">
       <div className="body">
         <div className='content'>
       {/* <AppRouter></AppRouter> */}
       {/* {(!localStorage.getItem('AccessToken') && <Login></Login>) || ( <Header />)} */}
       {/* <Login /> */}
       <Header />
       </div>
       </div>
       </div>}
      
    </div>
  );
}

export default App;
