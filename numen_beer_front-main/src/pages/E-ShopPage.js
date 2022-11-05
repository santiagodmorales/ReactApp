import React, { useState, useEffect } from 'react';
import ShopCard from '../components/cards/shopCards/ShopCard';
import "../styles/E-shop.css";
import { getReq } from '../helpers/ReqToApi';

const ShopPage = (props) => {

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

    console.log(products)


    return (
      <div className='main_cont'>
          <h1>Numen Beer - Tienda Online</h1>
        <div className='ES_cardContainer'>
  
          {loading ? "Cargando..." : products.map(item => 
          (
            <ShopCard id={item.id} name={item.name} packaging={item.packaging} stock={item.stock} price={item.price} description={item.description} image={item.image} />
          ))
          }
        </div>
      </div>   
    )
}

export default ShopPage;