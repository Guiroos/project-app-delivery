import React, { useEffect, useState } from "react";
import { Navbar, OrderCards } from "../components";
import { apiGet, changeStatusColor, getItemLocalStorage } from "../services";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "../images/doughnut_logo.png";

export default function CustomerOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        setIsLoading(true);
        const { email } = getItemLocalStorage("user");
        const response = await apiGet(`/sale/orders/email/${email}`);
        setOrderDetails(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    asyncFunc();
  }, []);

  const renderOrders = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <Image className="loading_image" src={logo} alt="" />
        </div>
      );
    } else {
      return (
        <main className="orders_page animate-bottom">
          <Navbar />
          <Container className="orders_page_container" fluid="md">
            <Row xs={2} md={4} className="g-4 orders_page_container_cards">
              {orderDetails.map((order, index) => (
                <Col key={order.id}>
                  <OrderCards
                    order={order}
                    index={index}
                    statusColor={changeStatusColor(order.status)}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </main>
      );
    }
  };

  return renderOrders();
}
