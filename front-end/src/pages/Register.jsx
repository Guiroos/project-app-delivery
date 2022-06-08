import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components";
import { getItemLocalStorage } from "../services";

export default function Register() {
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
    <main id="register-page" className="flex items-center justify-center mx-auto w-screen h-screen">
      {isLogin && navigate(path)}
      <RegisterForm />
    </main>
  );
}
