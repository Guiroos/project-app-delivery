import PropTypes from "prop-types";
import React from "react";
import { apiDelete } from "../services";

export default function AdminUsersList({ users, changeButton }) {
  const handleClick = (_e, user) => {
    apiDelete(`/user/${user.id}`);
    changeButton();
  };

  const renderUsers = () => users.map((user, index) => (
    <tr className="text-left text-gray-900" key={user.id}>
      <td className="px-6 py-4">{index + 1}</td>
      <td className="px-6 py-4">{user.name}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4 capitalize">{user.role}</td>
      <td
        className="px-6 py-4 cursor-pointer font-medium bg-red-600 text-white hover:underline text-center"
        role="presentation"
        onClick={(e) => handleClick(e, user)}
      >
        Remover
      </td>
    </tr>
  ));

  return (
    <div className="mx-8 my-4 text-sm md:text-base lg:text-xl">
      <p className="inline-block text-xl mb-4 border-b-2 border-violet-800">
        Lista de Usuários
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-left">
        <table className="w-full">
          <thead className="bg-gray-50 uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">
                <p className="sr-only">Remover Item</p>
              </th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
    </div>
  );
}

AdminUsersList.propTypes = {
  changeButton: PropTypes.func.isRequired,
  users: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
