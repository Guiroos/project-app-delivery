import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDate, validPrice } from "../services";

export default function OrderCards({ order, index, statusColor }) {
  const navigate = useNavigate();

  return (
    <Card
      className="orders_card"
      onClick={() => navigate(`/customer/orders/${order.id}`)}
    >
      <Card.Header>
        <Card.Title>{`Pedido ${index + 1}`}</Card.Title>
      </Card.Header>
      <Card.Body style={{ backgroundColor: statusColor }}>
        <Card.Text>{order.status}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Subtitle className="">{`R$ ${validPrice(order.totalPrice)} - ${formatDate(
          order.saleDate
        )}`}</Card.Subtitle>
      </Card.Footer>
    </Card>
  );
}
