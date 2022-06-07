import React, { useEffect, useState } from "react";
import { CheckoutForm, CheckoutProducts, Navbar } from "../components";
import { apiGet, getItemLocalStorage } from "../services";
import logo from "../images/doughnut_logo.png";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellers, setSellers] = useState([]);

  const cartTotalPrice = cart
    .map((item) => item.quantity * item.price)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  useEffect(() => {
    const asyncFunc = async () => {
      setIsLoading(true);
      try {
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

  const renderCheckout = () => {
    if (isLoading) {
      return (
        <div className="flex w-screen h-screen items-center justify-center">
          <img
            className="animate-[spin_2s_linear_infinite] h-[400px] md:h-[800px]"
            src={logo}
            alt="Loading"
          />
        </div>
      );
    }
    return (
      <main className="checkout_page">
        <Navbar />
        <CheckoutProducts
          cart={cart}
          setCart={setCart}
          totalPrice={cartTotalPrice}
        />
        <CheckoutForm
          cart={cart}
          totalPrice={cartTotalPrice}
          sellers={sellers}
        />
      </main>
    );
  };

  return <>{renderCheckout()}</>;
}
