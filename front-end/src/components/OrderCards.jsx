import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, validPrice } from "../services";
import Card from "react-bootstrap/Card";

export default function OrderCards({ order, index, userRole, statusColor }) {
  const navigate = useNavigate();

  const renderCards = () => {
    if (userRole === "customer") {
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
            <Card.Subtitle className="">{`R$ ${validPrice(
              order.totalPrice
            )} - ${formatDate(order.saleDate)}`}</Card.Subtitle>
          </Card.Footer>
        </Card>
      );
    } else if (userRole === "seller") {
      return (
        <Card
          className="orders_card"
          onClick={() => navigate(`/seller/orders/${order.id}`)}
        >
          <Card.Header>
            <Card.Title>{`Pedido ${index + 1}`}</Card.Title>
          </Card.Header>
          <Card.Body style={{ backgroundColor: statusColor }}>
            <Card.Text>{order.status}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Subtitle className="">{`R$ ${validPrice(
              order.totalPrice
            )} - ${formatDate(order.saleDate)}`}</Card.Subtitle>
          </Card.Footer>
          <Card.Footer>
            <Card.Subtitle>{order.deliveryAddress}</Card.Subtitle>
          </Card.Footer>
        </Card>
      );
    }
  };

  return <>{renderCards()}</>;
}
