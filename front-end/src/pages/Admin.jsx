import React, { useEffect, useState } from "react";
import { Navbar, AdminRegisterForm, AdminUsersList } from "../components";
import { apiGet } from "../services";
import Image from "react-bootstrap/Image";
import logo from "../images/doughnut_logo.png";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const changeButton = () => {
    setButtonClicked(!buttonClicked);
  };

  useEffect(() => {
    const asyncFunction = async () => {
      setIsLoading(true);
      const response = await apiGet("/user/all");
      setUsers(response.data);
      setIsLoading(false);
    };
    asyncFunction();
  }, [buttonClicked]);

  const renderAdmin = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <Image className="loading_image" src={logo} alt="" />
        </div>
      );
    } else {
      return (
        <main>
          <Navbar />
          <AdminRegisterForm changeButton={changeButton} />
          <AdminUsersList users={users} changeButton={changeButton} />
        </main>
      );
    }
  };

  return <>{renderAdmin()}</>
}
