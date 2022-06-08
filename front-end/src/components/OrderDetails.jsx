import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { apiPut, formatDate, validPrice } from "../services";
import GoBackButton from "./GoBackButton";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

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

  return (
    <div className="m-8 text-sm md:text-base lg:text-xl">
      <p className="inline-block text-lg mb-4 border-b-2 border-violet-800">
        Detalhes do Pedido
      </p>
      <div className="flex justify-between items-center text-center rounded-lg px-4 py-2 mb-4 bg-gray-100 shadow-md">
        <div className="font-bold">
          {`PEDIDO ${id.toString().padStart(4, "0")}`}
        </div>

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
              type="button"
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
                type="button"
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
                type="button"
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
              <TableHeader button={false} />
            </tr>
          </thead>
          <tbody>
            <TableBody cart={cart} />
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <GoBackButton
          toDo={() => (userRole === "customer"
            ? navigate("/customer/orders")
            : navigate("/seller/orders"))}
          text="← Go back"
        />
        <div className="p-3 bg-violet-800 rounded-lg">
          <p className="text-3xl font-bold text-white">
            {`Total: R$ ${validPrice(totalPrice)}`}
          </p>
        </div>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  changeButton: PropTypes.func.isRequired,
  id: PropTypes.shape({
    toString: PropTypes.func,
  }).isRequired,
  orderDetails: PropTypes.shape({
    orderProducts: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          name: PropTypes.string,
          price: PropTypes.number,
        }),
        quantity: PropTypes.number,
      }),
    ),
    saleDate: PropTypes.string,
    sellerName: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
  statusColor: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};
