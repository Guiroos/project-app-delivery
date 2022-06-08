import React, { useEffect, useState } from "react";
import { Navbar, OrderCards } from "../components";
import { apiGet, changeStatusColor, getItemLocalStorage } from "../services";
import logo from "../images/doughnut_logo.png";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserRole(getItemLocalStorage("user").role);
    const asyncFunc = async () => {
      if (userRole === "customer") {
        setIsLoading(true);
        try {
          const { email } = getItemLocalStorage("user");
          const response = await apiGet(`/sale/orders/email/${email}`);
          setOrderDetails(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      } else if (userRole === "seller") {
        setIsLoading(true);
        try {
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
        <div className="flex w-screen h-screen items-center justify-center">
          <img
            className="animate-[spin_2s_linear_infinite] h-[400px] md:h-[800px]"
            src={logo}
            alt="Loading"
          />
        </div>
      );
    }
    return (
      <main id="orders-page" className="animate-bottom">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-16">
          {orderDetails.map((order, index) => (
            <OrderCards
              key={order.id}
              order={order}
              index={index}
              userRole={userRole}
              statusColor={changeStatusColor(order.status)}
            />
          ))}
        </div>
      </main>
    );
  };

  return <>{renderOrders()}</>;
}
