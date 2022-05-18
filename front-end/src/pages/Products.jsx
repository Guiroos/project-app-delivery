import React, { useEffect, useState } from "react";
import { Navbar, ProductCard, ProductCheckoutButton } from "../components";
import { CartProvider } from "../contexts";
import { apiGet } from "../services";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import logo from "../images/doughnut_logo.png";
import { Image } from "react-bootstrap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        setIsLoading(true);
        const response = await apiGet("/products");
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, []);

  const renderProducts = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <Image className="loading_image" src={logo} alt="" />
        </div>
      );
    } else {
      return (
        <main className="products_page animate-bottom">
          <Navbar />
          <CartProvider>
            <Container className="products_page_container" fluid="md">
              <Row xs={1} md={4} className="g-4 products_page_container_cards">
                {products.map((product) => (
                  <Col key={product.id}>
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      urlImage={product.urlImage}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            <ProductCheckoutButton />
          </CartProvider>
        </main>
      );
    }
  };

  return <>{renderProducts()}</>;
}
