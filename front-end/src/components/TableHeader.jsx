import PropTypes from "prop-types";
import React from "react";

export default function TableHeader({ button }) {
  return (
    <>
      <th className="px-6 py-3">Item</th>
      <th className="px-6 py-3 text-left">Descrição</th>
      <th className="px-2 py-3">Quantidade</th>
      <th className="px-6 py-3">Valor Unitário</th>
      <th className="px-6 py-3">Sub-Total</th>
      {button && (
        <th className="px-6 py-3">
          <p className="sr-only">Remover Item</p>
        </th>
      )}
    </>
  );
}

TableHeader.propTypes = {
  button: PropTypes.bool.isRequired,
};
