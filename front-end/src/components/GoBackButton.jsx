import PropTypes from "prop-types";
import React from "react";

export default function GoBackButton({ toDo, text }) {
  return (
    <div className="p-4 text-blue-400 cursor-pointer">
      <p role="presentation" onClick={toDo}>
        {text}
      </p>
    </div>
  );
}

GoBackButton.propTypes = {
  text: PropTypes.string.isRequired,
  toDo: PropTypes.string.isRequired,
};
