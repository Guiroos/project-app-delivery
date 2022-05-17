import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FormLogin from '../components/LoginForm';
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
      {isLogin && navigate(path)}
      <FormLogin />
    </div>
  );
}
