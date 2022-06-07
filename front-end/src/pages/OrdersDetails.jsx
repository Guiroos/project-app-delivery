import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navbar, OrderDetails } from "../components";
import { apiGet, changeStatusColor, getItemLocalStorage } from "../services";
import logo from "../images/doughnut_logo.png";

export default function OrdersDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusColor, setStatusColor] = useState("");
  const [userRole, setUserRole] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const { id } = useParams();

  const changeButton = () => {
    setButtonClicked(!buttonClicked);
  };

  useEffect(() => {
    setUserRole(getItemLocalStorage("user").role);
    const asyncFunc = async () => {
      setIsLoading(true);
      try {
        const details = await apiGet(`sale/orders/id/${id}`);
        setOrderDetails(details.data);
        setStatusColor(changeStatusColor(details.data.status));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, [id, buttonClicked]);

  const renderOrderDetails = () => {
    if (isLoading) {
      return (
        <div className="flex w-screen h-screen items-center justify-center">
          <img className="animate-[spin_2s_linear_infinite] h-[400px] md:h-[800px]" src={logo} alt="Loading" />
        </div>
      );
    } else {
      return (
        <main className="customer_order_details animate-bottom">
          <Navbar />

          <OrderDetails
            orderDetails={orderDetails}
            id={id}
            statusColor={statusColor}
            userRole={userRole}
            changeButton={changeButton}
          />
        </main>
      );
    }
  };

  return <>{renderOrderDetails()}</>;
}
