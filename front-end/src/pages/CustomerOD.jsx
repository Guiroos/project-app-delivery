import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navbar, OrderDetails } from "../components";
import { apiGet, validPrice, changeStatusColor } from "../services";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "../images/doughnut_logo.png";

export default function CustomerOD() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusColor, setStatusColor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        setIsLoading(true);
        const details = await apiGet(`sale/orders/id/${id}`);
        setOrderDetails(details.data);
        setStatusColor(changeStatusColor(details.data.status));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, [id]);

  const renderOrderDetails = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <Image className="loading_image" src={logo} alt="" />
        </div>
      );
    } else {
      return (
        <main className="customer_order_details animate-bottom">
          <Navbar />
          <Container>
            <h4>Detalhes do Pedido</h4>
            <div className="box">
              <OrderDetails
                orderDetails={orderDetails}
                id={id}
                statusColor={statusColor}
              />
              <span className="table_total">{`Total: R$ ${validPrice(
                orderDetails.totalPrice
              )}`}</span>
            </div>
          </Container>
        </main>
      );
    }
  };

  return <>{renderOrderDetails()}</>;
}
