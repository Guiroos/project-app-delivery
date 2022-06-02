import React, { useEffect, useState } from "react";
import { Navbar, OrderCards } from "../components";
import { apiGet, changeStatusColor, getItemLocalStorage } from "../services";
import Image from "react-bootstrap/Image";
import logo from "../images/doughnut_logo.png";

export default function Orders() {
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
      } else if (userRole === "seller") {
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
        <main className="animate-bottom">
          <Navbar />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-16">
            {orderDetails.map((order, index) => (
              <OrderCards
                order={order}
                index={index}
                userRole={userRole}
                statusColor={changeStatusColor(order.status)}
              />
            ))}
          </div>
        </main>
      );
    }
  };

  return <>{renderOrders()}</>;
}
