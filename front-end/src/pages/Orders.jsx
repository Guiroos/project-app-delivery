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
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserRole(getItemLocalStorage("user").role);
    const asyncFunc = async () => {
      if (userRole === "customer") {
        try {
          setIsLoading(true);
          const { email } = getItemLocalStorage("user");
          const response = await apiGet(`/sale/orders/email/${email}`);
          setOrderDetails(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      } else if(userRole === "seller") {
        try {
          setIsLoading(true);
          const { email } = getItemLocalStorage("user");
          const response = await apiGet(`/sellers/orders/email/${email}`);
          setOrderDetails(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    };
    asyncFunc();
  }, [userRole]);

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
                <Col key={index}>
                  <OrderCards
                    order={order}
                    index={index}
                    userRole={userRole}
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

  return <>{renderOrders()}</>;
}
