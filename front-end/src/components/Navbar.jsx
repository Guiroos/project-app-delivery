import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { getItemLocalStorage, removeFromLocalStorage } from '../services';
import { useNavigate } from 'react-router-dom';

export default function NavBarBS() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    removeFromLocalStorage('user');
    removeFromLocalStorage('cart');
    navigate('/login');
  };

  useEffect(() => {
    const userLocal = getItemLocalStorage('user');
    setUser(userLocal);
  }, []);

  const renderNavBar = () => {
    if (user.role === 'customer') {
      return (
        <>
          <Nav.Item>
            <Nav.Link
              data-testid="customer_products__element-navbar-link-products"
              href="/customer/products"
            >
              PRODUTOS
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              data-testid="customer_products__element-navbar-link-orders"
              href="/customer/orders"
            >
              MEUS PEDIDOS
            </Nav.Link>
          </Nav.Item>
        </>
      );
    } if (user.role === 'seller') {
      return (
        <Nav.Item>
          <Nav.Link
            data-testid="customer_products__element-navbar-link-orders"
            href="/seller/orders"
          >
            PEDIDOS
          </Nav.Link>
        </Nav.Item>
      );
    } return (
      <Nav.Item>
        <Nav.Link
          data-testid="customer_products__element-navbar-link-orders"
          href="/admin/manage"
        >
          GERENCIAR USUÁRIOS
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <Nav fill variant="tabs"className="products_page_navbar">
      {renderNavBar()}
      <Nav.Item className="nav_item">
        {user.name}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={ () => handleLogout() }
        >
          SAIR
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
