import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { getItemLocalStorage } from "../services";
import logo from "../images/doughnut_logo.png";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [path, setPath] = useState("/customer/products");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getItemLocalStorage("user");
    if (user) {
      if (user.role === "seller") {
        setPath("/seller/orders");
      } else if (user.role === "administrator") {
        setPath("/admin/manage");
      }
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-screen h-screen">
      {isLogin && navigate(path)}
      <img src={logo} alt="logo" className="h-56 lg:h-96" />
      <LoginForm />
    </div>
  );
}
