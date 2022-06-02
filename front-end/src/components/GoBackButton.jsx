import React from "react";

export default function GoBackButton({ toDo, text }) {
  return (
    <div className="p-4 text-blue-400 cursor-pointer">
      <p onClick={toDo}>{text}</p>
    </div>
  );
}
