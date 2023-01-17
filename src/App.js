import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Drawer } from './components/Drawer';
// import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import Employees from './pages/Employees';
import EmployeesNew from './pages/EmployeesNew';
import EmployeesUpdate from './pages/EmployeesUpdate';
import ProductCategories from './pages/ProductCategories';
import Products from './pages/Products';
import ProductsNew from './pages/ProductsNew';
import ProductsUpdate from './pages/ProductsUpdate';
import Cashier from './pages/Cashier';
import CashierTransaction from './pages/CashierTransaction';
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
            <Route path="employees/edit/:userId" element = {<EmployeesUpdate/>}/>
            <Route path='productCategories' element= {<ProductCategories/>}/>
            <Route path='products' element = {<Products/>}/>
            <Route path='products/new' element={<ProductsNew/>}/>
            <Route path='products/edit/:productId' element={<ProductsUpdate/>}/>
            <Route path='cashier' element={<Cashier/>}/>
            <Route path='cashier/transactions' element={<CashierTransaction/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
