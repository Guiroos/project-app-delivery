import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  apiPostToken,
  getItemLocalStorage,
  STATUS,
  removeFromLocalStorage,
} from "../services";

export default function CheckoutForm({ cart, totalPrice, sellers }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      sellerName: "",
      userAddress: "",
      userAddressNumber: "",
    },
  });

  const onSubmit = async (data) => {
    const { token, email } = getItemLocalStorage("user");
    const orderData = {
      order: {
        ...data,
        cart,
        email,
        orderPrice: totalPrice,
      },
    };
    try {
      const response = await apiPostToken(
        "/customer/checkout",
        orderData,
        token,
      );
      if (response.status === STATUS.CREATED) {
        const idOrder = response.data.saleId;
        removeFromLocalStorage("cart");
        navigate(`/customer/orders/${idOrder}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-8 text-sm md:text-base lg:text-xl">
      <p className="inline-block text-lg mb-4 border-b-2 border-violet-800">
        Detalhes e Endereço de Entrega
      </p>
      <form
        className="bg-gray-100 shadow-md rounded px-4 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-[360px]">
            <label className="block mb-3" htmlFor="sellerName">
              Vendedor
            </label>
            <select
              type="text"
              id="sellerName"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("sellerName", { required: true })}
            >
              <option value="">Selecione um vendedor</option>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.name}>
                  {seller.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-3" htmlFor="userAddress">
              Endereço de entrega
            </label>
            <input
              type="text"
              id="userAddress"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Rua, complemento..."
              {...register("userAddress", {
                required: true,
              })}
            />
          </div>

          <div className="w-full md:max-w-[100px]">
            <label className="block mb-3" htmlFor="userAddressNumber">
              Número
            </label>
            <input
              type="number"
              id="userAddressNumber"
              placeholder="330"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("userAddressNumber", {
                required: true,
              })}
            />
          </div>
        </div>

        <div className="text-white flex justify-center items-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 py-4 px-16 rounded-md font-bold cursor-pointer"
            type="submit"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </form>
    </div>
  );
}

CheckoutForm.propTypes = {
  cart: PropTypes.isRequired,
  sellers: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  totalPrice: PropTypes.string.isRequired,
};
