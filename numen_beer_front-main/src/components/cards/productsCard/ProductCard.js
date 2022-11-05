import React from "react";
import "./ProductCard.css";
import Button from "../../button/Button";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReq } from '../../../helpers/ReqToApi.js';




const ProductCard = (props) => {
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


  return  ( loading ? "Cargando..." : prodata.map(item => (
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
          {item.description.slice(0,80)+"..."}
        </p>
        <Button url='Productos' style={{marginBottom:'0'}} text="Conocer más" className="secondary" />  
      </div>
    </div>
  
      ))
  ); 
};

export default ProductCard;
