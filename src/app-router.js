import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CPP  from './containers/MenuA/cpp.container.js';
import  MenuBComponent from './containers/MenuB/MenuB.container.js';
import  MenuCComponent from './containers/MenuC/MenuC.container.js';
import  MenuDComponent from './containers/MenuD/MenuD.container.js';
import  MenuEComponent from './containers/MenuE/MenuE.container.js';
import  DashboardComponent from './containers/dashboard/dashboard.container.jsx';
import { Login } from './containers/login/login.container.js';
import { UserMaster } from './containers/user-master/user-master.container.js';


export const AppRouter = () => <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/MenuA" element={<CPP />} />
  
  <Route path="/MenuB" element={<MenuBComponent />} />
  {/* <Route path="/menuB" element={<MenuBComponent />} /> */}
  <Route path="/MenuC" element={<MenuCComponent />} />
  <Route path="/MenuD" element={<MenuDComponent />} />
  <Route path="/MenuE" element={<MenuEComponent />} />
  <Route path="/dashboard" element={<DashboardComponent />} />
  <Route path="/UserMaster" element={<UserMaster />} />
</Routes>
</BrowserRouter>
