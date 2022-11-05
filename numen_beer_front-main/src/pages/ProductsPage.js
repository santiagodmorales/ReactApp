import React from "react";
import "../styles/ProductsPage.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReq } from '../helpers/ReqToApi.js';

const ProductsPage = () => {
  
  const [loading, setLoading] = useState(false);
  const [prodata, setProdCard] = useState([]);
  const navigate = useNavigate()

  const loadProdCard = async () => {
    setLoading(true);
    const response = await getReq(`/prodata`);
    setProdCard(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadProdCard();
  }, []);


  console.log(prodata)


  return  ( 

    <>
    <h1 className="title">Nuestros productos</h1>
    <div class="productCardContainer">
    {loading ? "Cargando..." : prodata.map(item => (
    <div class="ProductCard">
      <div
        class="card-imgbox"
        style={{
          backgroundImage: `url('./images/products/${item.image}.png')`,
        }}
      ></div>
    
      <div class="card-text">
        <h3>{item.name}</h3>
        <p>
          {item.description}
        </p>
      </div>
    </div>
   
      ))}
      </div> 
      </>
  );
};


export default ProductsPage;
