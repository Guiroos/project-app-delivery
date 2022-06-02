import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getItemLocalStorage,
  saveToLocalStorage,
  validPrice,
} from "../services";
import GoBackButton from "./GoBackButton";

export default function CheckoutProducts({ cart, setCart, totalPrice }) {
  const navigate = useNavigate();
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
        <tr className="text-center text-gray-900" key={index}>
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left">
            {item.name}
          </td>
          <td className="">{item.quantity}</td>
          <td className="px-6 py-4">{`R$ ${validPrice(item.price)}`}</td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{`R$ ${validPrice(
            totalPrice
          )}`}</td>
          <td
            className="px-6 py-4 cursor-pointer font-medium bg-red-600 text-white hover:underline"
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
    <div className="m-8 text-sm md:text-base lg:text-xl">
      <p className="inline-block text-xl mb-4 border-b-2 border-violet-800">
        Finalizar Pedido
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full">
          <thead className="bg-gray-50 uppercase">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3 text-left">Descrição</th>
              <th className="px-2 py-3">Quantidade</th>
              <th className="px-6 py-3">Valor Unitário</th>
              <th className="px-6 py-3">Sub-Total</th>
              <th className="px-6 py-3">
                <p className="sr-only">Remover Item</p>
              </th>
            </tr>
          </thead>
          <tbody>{renderItemsTable()}</tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <GoBackButton
          toDo={() => navigate("/customer/products")}
          text="← Continue Shopping"
        />
        <div className="flex justify-between items-center rounded-lg bg-violet-50 text-sm p-2">
          <div className="p-2">
            <p className="">{`Sub Total: R$ ${validPrice(totalPrice)}`}</p>
          </div>
          <div className="p-2">
            <p className="">{`Frete: R$ ${validPrice("0.00")}`}</p>
          </div>
          <div className="p-2">
            <p className="">{`Desconto: R$ ${validPrice("0,00")}`}</p>
          </div>
          <div className="p-3 bg-violet-800 rounded-lg">
            <p className="text-xl md:text-3xl font-bold text-white">{`Total: R$ ${validPrice(
              totalPrice
            )}`}</p>
          </div>
        </div>
      </div>
    </div>
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
  totalPrice: PropTypes.string.isRequired,
};
