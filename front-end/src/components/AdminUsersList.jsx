import React from "react";
import Table from "react-bootstrap/Table";
import { apiDelete } from "../services";

export default function AdminUsersList({ users, changeButton }) {
  const handleClick = (_e, user) => {
    apiDelete(`/user/${user.id}`);
    changeButton();
  };

  const renderUsers = () => {
    return users.map((user, index) => {
      return (
        <tr key={index}>
          <td className="table_row_id">{index + 1}</td>
          <td className="table_row_name">{user.name}</td>
          <td className="table_row_email">{user.email}</td>
          <td className="table_row_role">{user.role}</td>
          <td
            className="table_row_button"
            onClick={(e) => handleClick(e, user)}
          >
            Remover
          </td>
        </tr>
      );
    });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>{renderUsers()}</tbody>
    </Table>
  );
}
