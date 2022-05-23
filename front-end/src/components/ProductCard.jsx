import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import {
  validPrice,
  saveToLocalStorage,
  getItemLocalStorage,
} from "../services";
import { CartContext } from "../contexts";

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
    <Card className="bg-dark customer_products">
      <Card.Img className="card_img" src={urlImage} alt={name} />
      <Card.ImgOverlay className="card_img_overlay">
        <Card.Text className="card__price">
          {`R$ ${validPrice(price)}`}
        </Card.Text>
      </Card.ImgOverlay>
      <Card.Body className="card_body">
        <Card.Title className="card_name text-white">{name}</Card.Title>
      </Card.Body>
      <Card.Footer className="card_footer">
        <Button
          variant="success"
          type="submit"
          onClick={() => handleClick("remove")}
        >
          -
        </Button>

        <input
          className="input_quantity"
          type="number"
          name="quantity"
          min={0}
          value={+localQuantity}
          onChange={(e) => handleChange(+e.target.value)}
        />

        <Button
          variant="success"
          type="submit"
          onClick={() => handleClick("add")}
        >
          +
        </Button>
      </Card.Footer>
    </Card>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
