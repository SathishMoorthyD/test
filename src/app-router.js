import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { CPP } from './containers/cpp/cpp.container.js';
import { Login } from './containers/login/login.container.js';
export const AppRouter = () => <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/cpp" element={<CPP />} />
</Routes>
</BrowserRouter>
