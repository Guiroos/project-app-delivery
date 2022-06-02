import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { apiPut, formatDate, validPrice } from "../services";
import GoBackButton from "./GoBackButton";

export default function OrderDetails({
  orderDetails,
  id,
  statusColor,
  userRole,
  changeButton,
}) {
  const { orderProducts: cart, totalPrice } = orderDetails;
  const navigate = useNavigate();

  const handleClick = async (value) => {
    await apiPut(`sellers/status/id/${id}`, { newStatus: value });
    changeButton();
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
        </tr>
      );
    });
  };

  return (
    <div className="m-8 text-sm md:text-base lg:text-xl">
      <p className="inline-block text-lg mb-4 border-b-2 border-violet-800">
        Detalhes do Pedido
      </p>
      <div className="flex justify-between items-center text-center rounded-lg px-4 py-2 mb-4 bg-gray-100 shadow-md">
        <div className="font-bold">{`PEDIDO ${id
          .toString()
          .padStart(4, "0")}`}</div>

        {userRole === "customer" && (
          <div>{`VENDEDOR: ${orderDetails.sellerName}`}</div>
        )}

        <div>{formatDate(orderDetails.saleDate)}</div>

        <div
          className="p-3 rounded-lg uppercase font-bold"
          style={{ backgroundColor: statusColor }}
        >
          {orderDetails.status}
        </div>

        {userRole === "customer" && (
          <div>
            <button
              value="Entregue"
              onClick={(e) => handleClick(e.target.value)}
              disabled={orderDetails.status !== "Em Trânsito"}
              className="p-3 rounded-lg bg-green-800 hover:valid:bg-green-700 text-white cursor-pointer disabled:cursor-not-allowed"
            >
              ENTREGUE
            </button>
          </div>
        )}

        {userRole === "seller" && (
          <>
            <div>
              <button
                value="Preparando"
                onClick={(e) => handleClick(e.target.value)}
                disabled={orderDetails.status !== "Pendente"}
                className="p-3 rounded-lg bg-green-800 hover:valid:bg-green-700 text-white cursor-pointer disabled:cursor-not-allowed"
              >
                PREPARANDO PEDIDO
              </button>
            </div>
            <div>
              <button
                value="Em Trânsito"
                onClick={(e) => handleClick(e.target.value)}
                disabled={orderDetails.status !== "Preparando"}
                className="p-3 rounded-lg bg-green-800 hover:valid:bg-green-700 text-white cursor-pointer disabled:cursor-not-allowed"
              >
                SAIU PARA ENTREGA
              </button>
            </div>
          </>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full">
          <thead className="bg-gray-50 uppercase">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3 text-left">Descrição</th>
              <th className="px-2 py-3">Quantidade</th>
              <th className="px-6 py-3">Valor Unitário</th>
              <th className="px-6 py-3">Sub-Total</th>
            </tr>
          </thead>
          <tbody>{renderItemsTable()}</tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <GoBackButton
          toDo={() =>
            userRole === "customer"
              ? navigate("/customer/orders")
              : navigate("/seller/orders")
          }
          text="← Go back"
        />
        <div className="p-3 bg-violet-800 rounded-lg">
          <p className="text-3xl font-bold text-white">{`Total: R$ ${validPrice(
            totalPrice
          )}`}</p>
        </div>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.string.isRequired,
  orderDetails: PropTypes.object.isRequired,
  statusColor: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  changeButton: PropTypes.func.isRequired,
};
