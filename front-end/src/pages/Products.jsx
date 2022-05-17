import React, { useEffect, useState } from 'react';
import { Navbar, ProductCard, ProductCheckoutButton } from '../components';
import { CartProvider } from '../contexts';
import { apiGet } from '../services';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const response = await apiGet('/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, []);

  return (
    <main className="products_page">
      <Navbar />
      <CartProvider>
        <Container className="products_page_container" fluid="md">
          <Row xs={1} md={4} className="g-4 products_page_container_cards">
            {products.map((product) => (
              <Col key={ product.id }>
                <ProductCard
                  key={ product.id }
                  id={ product.id }
                  name={ product.name }
                  price={ product.price }
                  urlImage={ product.urlImage }
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
