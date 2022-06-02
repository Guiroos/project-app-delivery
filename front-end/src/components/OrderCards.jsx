import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, validPrice } from "../services";

export default function OrderCards({ order, index, userRole, statusColor }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-200 shadow-lg border rounded-lg text-2xl md:text-xl lg:text-base"
      onClick={
        userRole === "customer"
          ? () => navigate(`/customer/orders/${order.id}`)
          : () => navigate(`/seller/orders/${order.id}`)
      }
    >
      <div className="p-3 bg-white flex flex-col text-center justify-center">
        <p>Pedido</p>
        <p>{(index + 1).toString().padStart(4, "0")}</p>
      </div>
      <div
        className="flex items-center justify-center m-2 p-4 rounded-md "
        style={{ backgroundColor: statusColor }}
      >
        <p>{order.status}</p>
      </div>
      <div className="flex flex-row justify-center items-center text-center p-2 gap-2">
        <div className="bg-gray-100 p-2 rounded-lg w-full">
          <p className="">{`R$ ${validPrice(order.totalPrice)}`}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg w-full">
          <p>{formatDate(order.saleDate)}</p>
        </div>
      </div>
      {userRole === "seller" && (
        <div>
          <p>{order.deliveryAddress}</p>
        </div>
      )}
    </div>
  );
}
