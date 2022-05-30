import Rseact from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CPP  from './containers/cpp/cpp.container.js';
import  MenuBComponent from './containers/MenuB/MenuB.container.js';
import  MenuCComponent from './containers/MenuC/MenuC.container.js';
import  MenuDComponent from './containers/MenuD/MenuD.container.js';
import  MenuEComponent from './containers/MenuE/MenuE.container.js';
import  DashboardComponent from './containers/dashboard/dashboard.container.jsx';
import { Login } from './containers/login/login.container.js';
import { PaperCompnent } from './containers/paper/paper.component.js';
import { PaperContainer } from './containers/paper/paper.container.js';
import { PulpCompnent } from './containers/pulp/pulp.component.js';
import { PulpContainer } from './containers/pulp/Pulp.container.js';

export const AppRouter = () => <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/cpp" element={<CPP />} />
  
  <Route path="/MenuB" element={<MenuBComponent />} />
  {/* <Route path="/menuB" element={<MenuBComponent />} /> */}
  <Route path="/MenuC" element={<MenuCComponent />} />
  <Route path="/MenuD" element={<MenuDComponent />} />
  <Route path="/MenuE" element={<MenuEComponent />} />
  <Route path="/dashboard" element={<DashboardComponent />} />
  
</Routes>
</BrowserRouter>
