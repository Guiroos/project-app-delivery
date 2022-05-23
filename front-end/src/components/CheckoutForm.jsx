import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  apiPostOrder,
  getItemLocalStorage,
  STATUS,
  removeFromLocalStorage,
} from "../services";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      order: { ...data, cart, email, orderPrice: totalPrice },
    };
    try {
      const response = await apiPostOrder(
        "/customer/checkout",
        orderData,
        token
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="sellerName">
        <Form.Label>Selecione o vendedor</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="sellerName"
          {...register("sellerName", { required: true })}
        >
          <option value="">Selecione um vendedor</option>
          {sellers.map((seller) => (
            <option key={seller.id} value={seller.name}>
              {seller.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="userAddress">
        <Form.Label>Endereço de entrega</Form.Label>
        <Form.Control
          type="text"
          name="userAddress"
          placeholder="Rua, complemento..."
          {...register("userAddress", {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group controlId="userAddressNumber">
        <Form.Label>Número</Form.Label>
        <Form.Control
          type="number"
          name="userAddressNumber"
          placeholder="330"
          {...register("userAddressNumber", {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group controlId="buttons">
        <Button type="submit">FINALIZAR PEDIDO</Button>
      </Form.Group>
    </Form>
  );
}

CheckoutForm.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.string.isRequired,
  sellers: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
};
