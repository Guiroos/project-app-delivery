import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { CheckoutProducts, Navbar } from "../components";
import {
  apiGet,
  getItemLocalStorage,
  saveToLocalStorage,
  validPrice,
} from "../services";

export default function CheckoutClient() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellers, setSellers] = useState([]);

  const cartTotalPrice = cart
    .map((item) => item.quantity * item.price)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        setIsLoading(true);
        const cartStorage = getItemLocalStorage("cart");
        const resSellers = await apiGet("/sellers");
        setSellers(resSellers.data);
        setCart(cartStorage);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, []);

  return (
    <main className="checkout_page">
      <Navbar />
      <Container fluid="md" className="checkout_table_container">
      <h4>Finalizar Pedido</h4>
      <div className="box">
        <CheckoutProducts
          cart={cart}
          setCart={setCart}
        />
        <span className="table_total">{`Total: R$ ${validPrice(cartTotalPrice)}`}</span>
      </div>
      </Container>
    </main>
  );
}
