import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts";
import {
  validPrice,
  saveToLocalStorage,
  getItemLocalStorage,
} from "../services";

export default function ProductsCard({ id, name, price, urlImage }) {
  const { products, manageCart } = useContext(CartContext);
  const localStorageQuantity =
    getItemLocalStorage("cart")?.find((e) => e.id === id)?.quantity ?? 0;
  const [localQuantity, setLocalQuantity] = useState(localStorageQuantity);

  useEffect(() => {
    if (!products.length) saveToLocalStorage("cart", []);
    saveToLocalStorage("cart", products);
  }, [manageCart.add, manageCart.remove, products, localQuantity]);

  const handleClick = (type) => {
    if (type === "add") {
      const quantity = localQuantity + 1;
      setLocalQuantity(quantity);
      manageCart.add({ id: +id, price, name, quantity });
    }
    if (type === "remove") {
      const quantity = localQuantity <= 1 ? 0 : localQuantity - 1;
      setLocalQuantity(quantity);
      manageCart.remove({ id: +id, quantity });
    }
  };

  const handleChange = (value) => {
    setLocalQuantity(+value);
    manageCart.overwrite({ id: +id, quantity: value, name, price });
  };

  return (
    <div className="shadow-lg border rounded-lg text-2xl md:text-xl lg:text-base">
      <div className="">
        <div className="absolute m-4 bg-slate-100 rounded-md p-2 shadow-md">{`R$ ${validPrice(
          price
        )}`}</div>
        <img className="rounded-lg" src={urlImage} alt={name} />
      </div>
      <div className="flex items-center justify-center h-20 bg-slate-800 text-white px-10 py-4 ">
        <p className="">{name}</p>
      </div>
      <div className="h-fit flex items-center justify-center gap-2 py-4 px-2 bg-slate-800 text-white">
        <button
          className="bg-green-700 hover:bg-green-800 box-border h-14 w-14 rounded-lg"
          type="button"
          onClick={() => handleClick("remove")}
        >
          -
        </button>

        <input
          type="number"
          name="quantity"
          min={0}
          value={+localQuantity}
          onChange={(e) => handleChange(+e.target.value)}
          className="w-full h-14 text-center text-black"
        />

        <button
          className="bg-green-700 hover:bg-green-800  box-border h-14 w-14  rounded-lg"
          type="button"
          onClick={() => handleClick("add")}
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
