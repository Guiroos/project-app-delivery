import PropTypes from "prop-types";
import React from "react";
import {
  getItemLocalStorage,
  saveToLocalStorage,
  validPrice,
} from "../services";
import Table from "react-bootstrap/Table";

export default function CheckoutProducts({ cart, setCart }) {
  const handleClick = (_e, item) => {
    const cartStorage = getItemLocalStorage("cart");
    const filteredMap = cartStorage.filter((iCart) => iCart.id !== item.id);
    setCart(filteredMap);
    saveToLocalStorage("cart", filteredMap);
  };

  const renderItemsTable = () => {
    return cart.map((item, index) => {
      const totalPrice = (item.quantity * item.price).toFixed(2);
      return (
        <tr key={index}>
          <td className="table_row_id">{index + 1}</td>
          <td className="table_row_name">{item.name}</td>
          <td className="table_row_quantity">{item.quantity}</td>
          <td className="table_row_price">{`R$ ${validPrice(item.price)}`}</td>
          <td className="table_row_total">{`R$ ${validPrice(totalPrice)}`}</td>
          <td
            className="table_row_button"
            value={item.id}
            onClick={(e) => handleClick(e, item)}
          >
            Remover
          </td>
        </tr>
      );
    });
  };

  return (
    <Table className="checkout_page_table" bordered>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>{renderItemsTable()}</tbody>
    </Table>
  );
}

CheckoutProducts.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCart: PropTypes.func.isRequired,
};
