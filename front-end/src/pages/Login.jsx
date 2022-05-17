import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LoginForm from '../components/LoginForm';
import Image from 'react-bootstrap/Image';
import image from '../images/doughnut_logo.png'
import { getItemLocalStorage } from '../services';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [path, setPath] = useState('/customer/products');
  const navigate = useNavigate();


  useEffect(() => {
    const user = getItemLocalStorage('user');
    if (user) {
      if (user.role === 'seller') {
        setPath('/seller/orders');
      } else if (user.role === 'administrator') {
        setPath('/admin/manage');
      }
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="login">
      <Image src={ image } alt="logo" className="login-logo"/>
      {isLogin && navigate(path)}
      <LoginForm />
    </div>
  );
}
