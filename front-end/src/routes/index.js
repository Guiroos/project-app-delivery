import React from 'react';
import {
  Routes, // instead of Switch
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import {
  Login,
  Register,
  Products,
  Checkout,
  Orders,
  OrdersDetails,
  Admin,
} from '../pages';

export default function RoutesApp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={ <Navigate to="/login" replace /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/checkout" element={ <Checkout /> } />
          <Route path="/customer/orders" element={ <Orders /> } />
          <Route path="/customer/orders/:id" element={ <OrdersDetails /> } />
          <Route path="/seller/orders" element={ <Orders /> } />
          <Route path="/seller/orders/:id" element={ <OrdersDetails /> } />
          <Route path="/admin/manage" element={ <Admin /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
