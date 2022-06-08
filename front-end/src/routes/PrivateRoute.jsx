import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { getItemLocalStorage } from "../services";

export default function PrivateRoute(props) {
  const { children } = props;
  const user = getItemLocalStorage("user");
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return [children];
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
