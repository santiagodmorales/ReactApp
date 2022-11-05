import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import ProductCard from "../components/cards/productsCard/ProductCard";
import QuickShopCard from "../components/cards/quickshop/quickShopCard";
import Carrusel from "../components/carrusel/Carrusel";
import Gift from "../components/gift/Gift";
import { getReq } from "../helpers/ReqToApi";
import "../styles/HomePage.css";

const HomePage = (props) => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    setLoading(true);
    const response = await getReq(`/products`);
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const prodShort = products.slice(0, 4)

  return (
    <>
      <div className="welcome_container">
        <div className="welcome_image">
          <div className="welcome_text">
            <h1>Numen Beer</h1>
            <h3>Compartimos el código de una buena cerveza</h3>
            <Button text="Conocé más" className="primary" url="e-Shop" />
          </div>
        </div>
      </div>
      <div className="QS_container">
        <h2>Ofertas del día</h2>
        <div className="QS_cardContainer">
          {prodShort.map((item) => (
            <QuickShopCard
            id={item.id} name={item.name} packaging={item.packaging} stock={item.stock} price={item.price} description={item.description} image={item.image}
            />
          ))}
        </div>
      </div>
      <Gift />
      <div className="QS_container">
        <h2>Descubre nuestras variedades</h2>

        <div class="productCardContainer">
          <ProductCard />
        </div>
      </div>
      <div className="center_container">
        <div className="center_image">
          <div className="center_text">
            <h2>Te invitamos a conocer nuestra fábrica</h2>
            <img
              src="./images/Logo NB.png"
              className="center_logo"
              alt="cerveza"
            />
            <Button text="Me interesa" className="primary" url="e-Shop" />
          </div>
        </div>
      </div>
      <Carrusel />
    </>
  );
};

export default HomePage;
