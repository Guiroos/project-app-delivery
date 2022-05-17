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
      <Container fluid className="checkout_table_container">
      <h2>Finalizar Pedido</h2>
        <Table className="checkout_page_table" bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <CheckoutProducts
                key={index}
                index={index}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                setCart={setCart}
              />
            ))}
          </tbody>
        </Table>
      <h2>{`Total: R$ ${validPrice(cartTotalPrice)}`}</h2>
      </Container>
    </main>
  );
}
