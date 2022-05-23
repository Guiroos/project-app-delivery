import PropTypes from "prop-types";
import React from "react";
import { apiPut, formatDate, validPrice } from "../services";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function OrderDetails({
  orderDetails,
  id,
  statusColor,
  userRole,
  changeButton,
}) {
  const handleClick = async (value) => {
    await apiPut(`sellers/status/id/${id}`, { newStatus: value });
    changeButton();
  };

  const renderItemsTable = () => {
    return orderDetails.orderProducts.map((item, index) => {
      const totalPrice = (item.quantity * item.price).toFixed(2);
      return (
        <tr key={index}>
          <td className="table_row_id">{index + 1}</td>
          <td className="table_row_name">{item.name}</td>
          <td className="table_row_quantity">{item.quantity}</td>
          <td className="table_row_price">{`R$ ${validPrice(item.price)}`}</td>
          <td className="table_row_total">{`R$ ${validPrice(totalPrice)}`}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <Container className="od_container">
        <Row>
          <Col>{`PEDIDO ${id}`}</Col>
          {userRole === "customer" && (
            <Col md="auto">{`VENDEDOR: ${orderDetails.sellerName}`}</Col>
          )}
          <Col>{formatDate(orderDetails.saleDate)}</Col>
          <Col style={{ backgroundColor: statusColor }}>
            {orderDetails.status}
          </Col>
          {userRole === "customer" && (
            <Col md="auto">
              <Button
                value="Entregue"
                onClick={(e) => handleClick(e.target.value)}
                disabled={orderDetails.status !== "Em trânsito"}
              >
                MARCAR COMO ENTREGUE
              </Button>
            </Col>
          )}
          {userRole === "seller" && (
            <>
              <Col md="auto">
                <Button
                  value="Preparando"
                  onClick={(e) => handleClick(e.target.value)}
                  disabled={orderDetails.status !== "Pendente"}
                >
                  PREPARANDO PEDIDO
                </Button>
              </Col>
              <Col md="auto">
                <Button
                  value="Em Trânsito"
                  onClick={(e) => handleClick(e.target.value)}
                  disabled={orderDetails.status !== "Preparando"}
                >
                  SAIU PARA ENTREGA
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <Table className="checkout_page_table" bordered>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
          </tr>
        </thead>
        <tbody>{renderItemsTable()}</tbody>
      </Table>
    </>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.string.isRequired,
  orderDetails: PropTypes.object.isRequired,
  statusColor: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  changeButton: PropTypes.func.isRequired,
};
