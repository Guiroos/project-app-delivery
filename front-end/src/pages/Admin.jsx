import React, { useEffect, useState } from "react";
import { Navbar, AdminRegisterForm, AdminUsersList } from "../components";
import { apiGet } from '../services';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const changeButton = () => {
    setButtonClicked(!buttonClicked);
  };

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await apiGet('/user/all');
      setUsers(response.data);
      setIsLoading(false);
    };
    asyncFunction();
  }, [buttonClicked]);

  return (
    <main>
      <Navbar />
      <AdminRegisterForm changeButton={changeButton}/>
      <AdminUsersList users={users} changeButton={changeButton}/>
    </main>
  );
}
