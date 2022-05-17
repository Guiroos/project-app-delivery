import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts';

export default function ProductCheckout() {
  const { products } = useContext(CartContext);
  const [cartPrice, setCartPrice] = useState(0);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate('/customer/checkout');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const changePrice = () => {
      const totalPrice = products
        .map((product) => +product.price * product.quantity)
        .reduce((acc, curr) => acc + curr, 0);
      console.log('totalPrice', totalPrice);
      setCartPrice(totalPrice);
    };
    changePrice();
  }, [products]);

  return (
    <div className="checkout_card d-grid gap-2 m-flex p-3 justify-content-md-end float">
      { console.log('products', products) }
      <Button
        type="button"
        disabled={ cartPrice === 0 }
        onClick={ handleClick }
      >
        <span className="checkout_card_price">Ver Carrinho: R$ { cartPrice.toFixed(2).replace('.', ',') }</span>
      </Button>
    </div>
  );
}
