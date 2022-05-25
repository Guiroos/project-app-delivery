import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import { getItemLocalStorage } from "../services";

export const CartContext = createContext({});

export default function CartProvider({ children }) {
  const cartLocalStorage = getItemLocalStorage("cart") ?? [];
  const [products, setProducts] = useState(cartLocalStorage);

  function add({ id, price, name, quantity }) {
    const copyProducts = [...products];
    const product = copyProducts.find((e) => e.id === id);
    if (!product) {
      const newProduct = { id, quantity, name, price };
      copyProducts.push(newProduct);
      setProducts(copyProducts);
    } else {
      product.quantity = quantity;
      const newCart = copyProducts.filter((e) => e.id !== id);
      setProducts([...newCart, product]);
    }
  }

  function remove({ id, quantity }) {
    const copyCart = [...products];
    const product = copyCart.find((e) => e.id === id);
    if (quantity > 0) {
      product.quantity = quantity;
      setProducts(copyCart);
    } else {
      const newCart = copyCart.filter((e) => e.id !== id);
      setProducts(newCart);
    }
  }

  function overwrite({ id, quantity, name, price }) {
    const copyProducts = [...products];
    const product = copyProducts.find((e) => e.id === id);
    if (!product && quantity > 0) {
      const newProduct = { id, quantity, name, price };
      copyProducts.push(newProduct);
      setProducts(copyProducts);
    } else if (product && quantity === 0) {
      const newCart = copyProducts.filter((e) => e.id !== id);
      setProducts(newCart);
    } else {
      product.quantity = quantity;
      const newCart = copyProducts.filter((e) => e.id !== id);
      setProducts([...newCart, product]);
    }
  }

  const manageCart = {
    add,
    remove,
    overwrite,
  };

  return (
    <CartContext.Provider value={{ products, manageCart }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
