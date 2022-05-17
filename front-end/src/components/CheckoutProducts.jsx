import PropTypes from 'prop-types';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { getItemLocalStorage, validPrice } from '../services';

export default function CheckoutProducts({
  index,
  id,
  name,
  quantity,
  price,
  setCart,
}) {
  const totalPrice = (quantity * price).toFixed(2);
  const productIndex = index + 1;

  const handleClick = () => {
    const newCheckoutCart = getItemLocalStorage('cart');
    const filteredCheckoutCard = newCheckoutCart.filter((e) => e.id !== id);
    setCart(filteredCheckoutCard);
  };

  return (
    <tr>
      <td className="table_row_id">{productIndex}</td>
      <td className="table_row_name">{name}</td>
      <td className="table_row_quantity">{quantity}</td>
      <td className="table_row_price">{`R$ ${validPrice(price)}`}</td>
      <td className="table_row_total">{`R$ ${validPrice(totalPrice)}`}</td>
      <td className="table_row_button"><Button onClick={ handleClick }>Remover</Button></td>
    </tr>
  );
}

CheckoutProducts.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  setCart: PropTypes.func.isRequired,
};
