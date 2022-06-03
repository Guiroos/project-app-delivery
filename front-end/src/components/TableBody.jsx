import React from "react";
import { validPrice } from "../services";

export default function TableBody({ cart, button, handleClick }) {
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
        {button && (
          <td
            className="px-6 py-4 cursor-pointer font-medium bg-red-600 text-white hover:underline"
            value={item.id}
            onClick={(e) => handleClick(e, item)}
          >
            Remover
          </td>
        )}
      </tr>
    );
  });
}
