import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { formatDate, validPrice } from "../services";
import { Button, Row } from "react-bootstrap";

export default function OrderDetails({ orderDetails, id, statusColor }) {

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
          <Col md="auto">{`VENDEDOR: ${orderDetails.sellerName}`}</Col>
          <Col>{formatDate(orderDetails.saleDate)}</Col>
          <Col style={{ backgroundColor: statusColor }}>
            {orderDetails.status}
          </Col>
          <Col md="auto"><Button disabled={orderDetails.status !== "Em trânsito"}>MARCAR COMO ENTREGUE</Button></Col>
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
  orderDetails: PropTypes.object.isRequired,
};
