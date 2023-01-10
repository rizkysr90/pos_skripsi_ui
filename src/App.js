import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Drawer } from './components/Drawer';
// import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import Employees from './pages/Employees';
import EmployeesNew from './pages/EmployeesNew';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oke" element={<div>Oke nice progress</div>} />
          {/* <Route path="/auth/login" element={<Login/>} /> */}
          <Route path="/admin/dashboard" element={<AdminDashboard/>}>
            <Route path="employees" element= {<Employees/>}/>
            <Route path="employees/new" element = {<EmployeesNew/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
