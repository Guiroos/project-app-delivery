import React, { useEffect, useState } from "react";
import { CartProvider } from "../contexts";
import { Navbar, ProductCard, ProductCheckoutButton } from "../components";
import { apiGet } from "../services";
import logo from "../images/doughnut_logo.png";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      setIsLoading(true);
      try {
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
        <div className="flex w-screen h-screen items-center justify-center">
          <img className="animate-[spin_2s_linear_infinite] h-[400px] md:h-[800px]" src={logo} alt="Loading" />
        </div>
      );
    } else {
      return (
        <main className="animate-bottom">
          <Navbar />
          <CartProvider>
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-16">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    urlImage={product.urlImage}
                  />
                ))}
              </div>
            </div>

            <ProductCheckoutButton />
          </CartProvider>
        </main>
      );
    }
  };

  return <>{renderProducts()}</>;
}
