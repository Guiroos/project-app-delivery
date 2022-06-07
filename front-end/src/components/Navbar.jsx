import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItemLocalStorage, removeFromLocalStorage } from "../services";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const navigate = useNavigate();

  const collapse = () => {
    setNavbarCollapse(!navbarCollapse);
  };

  const handleLogout = () => {
    removeFromLocalStorage("user");
    removeFromLocalStorage("cart");
    navigate("/login");
  };

  useEffect(() => {
    const userLocal = getItemLocalStorage("user");
    setUser(userLocal);
  }, []);

  const renderNavbar = () => {
    if (user.role === "customer") {
      return (
        <>
          <div className="relative z-10 hover:text-gray-300">
            <p
              role="presentation"
              className="cursor-pointer"
              onClick={() => navigate("/customer/products")}
            >
              PRODUTOS
            </p>
          </div>
          <div className="relative z-10 hover:text-gray-300">
            <p
              role="presentation"
              className="cursor-pointer"
              onClick={() => navigate("/customer/orders")}
            >
              MEUS PEDIDOS
            </p>
          </div>
        </>
      );
    }
    if (user.role === "seller") {
      return (
        <div className="relative z-10 hover:text-gray-300">
          <p
            role="presentation"
            className="cursor-pointer"
            onClick={() => navigate("/seller/orders")}
          >
            PEDIDOS
          </p>
        </div>
      );
    }
    return (
      <div className="relative z-10 hover:text-gray-300">
        <p
          role="presentation"
          className="cursor-pointer"
          onClick={() => navigate("/admin/manage")}
        >
          GERENCIAR USUÁRIOS
        </p>
      </div>
    );
  };

  return (
    <nav className="sticky z-10 top-0 h-14 w-full text-white text-lg lg:text-xl bg-violet-800 flex items-center justify-between px-5">
      {renderNavbar()}
      <div className="relative z-10">
        <button
          type="button"
          className="block h-12 w-12 overflow-hidden"
          onClick={collapse}
        >
          <img
            className="bg-white h-full w-full object-cover rounded-full"
            src={`https://avatars.dicebear.com/api/big-smile/${user.name}.svg`}
            alt="Avatar"
          />
        </button>
      </div>
      {navbarCollapse && (
        <>
          <div className="absolute w-48 w-max-56 z-10 text-sm right-2 bg-violet-400 flex flex-col items-center px-2 py-2 rounded-lg shadow-lg mt-[175px]">
            <div className="w-full border-b-2 pb-2 mb-2">
              <p className="truncate">{user.name}</p>
              <p className="truncate">{user.email}</p>
            </div>
            <p
              role="presentation"
              className="cursor-pointer font-bold text-base"
              onClick={() => handleLogout()}
            >
              Logout
            </p>
          </div>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            tabIndex={-1}
            onClick={collapse}
            className="fixed inset-0 w-screen h-screen cursor-default"
          />
        </>
      )}
    </nav>
  );
}
