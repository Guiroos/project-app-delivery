import React from 'react';
import {
  Routes, // instead of Switch
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import {
  Login,
  Register
} from '../pages';

export default function RoutesApp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={ <Navigate to="/login" replace /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}