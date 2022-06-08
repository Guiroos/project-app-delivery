import React from "react";
import {
  Routes, // instead of Switch
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import {
  Login,
  Register,
  Products,
  Checkout,
  Orders,
  OrdersDetails,
  Admin,
} from "../pages";
import PrivateRoute from "./PrivateRoute";

export default function RoutesApp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/customer/products"
            element={(
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            )}
          />
          <Route
            path="/customer/checkout"
            element={(
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            )}
          />
          <Route
            path="/customer/orders"
            element={(
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            )}
          />
          <Route
            path="/customer/orders/:id"
            element={(
              <PrivateRoute>
                <OrdersDetails />
              </PrivateRoute>
            )}
          />
          <Route
            path="/seller/orders"
            element={(
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            )}
          />
          <Route
            path="/seller/orders/:id"
            element={(
              <PrivateRoute>
                <OrdersDetails />
              </PrivateRoute>
            )}
          />
          <Route
            path="/admin/manage"
            element={(
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            )}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
