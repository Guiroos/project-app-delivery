import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts";

export default function ProductCheckout() {
  const { products } = useContext(CartContext);
  const [cartPrice, setCartPrice] = useState(0);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate("/customer/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const changePrice = () => {
      const totalPrice = products
        .map((product) => +product.price * product.quantity)
        .reduce((acc, curr) => acc + curr, 0);
      setCartPrice(totalPrice);
    };
    changePrice();
  }, [products]);

  return (
    <div className="fixed bottom-5 right-5 bg-blue-500 text-white p-2 rounded-lg">
      <button type="button" disabled={cartPrice === 0} onClick={handleClick}>
        <p className="checkout_card_price">
          Ver Carrinho: R$
          {" "}
          {cartPrice.toFixed(2).replace(".", ",")}
        </p>
      </button>
    </div>
  );
}
