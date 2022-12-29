import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Drawer } from './components/Drawer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oke" elemetn={<div>Oke nice progress</div>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
