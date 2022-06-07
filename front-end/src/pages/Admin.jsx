import React, { useEffect, useState } from "react";
import { Navbar, AdminRegisterForm, AdminUsersList } from "../components";
import { apiGet } from "../services";
import logo from "../images/doughnut_logo.png";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const changeButton = () => {
    setButtonClicked(!buttonClicked);
  };

  useEffect(() => {
    setIsLoading(true);
    const asyncFunction = async () => {
      try {
        const response = await apiGet("/user/all");
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunction();
  }, [buttonClicked]);

  const renderAdmin = () => {
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
      <main>
        <Navbar />
        <AdminRegisterForm changeButton={changeButton} />
        <AdminUsersList users={users} changeButton={changeButton} />
      </main>
    );
  };

  return <>{renderAdmin()}</>;
}
