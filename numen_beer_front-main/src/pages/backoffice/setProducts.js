import { useState, useEffect } from 'react';
import React from 'react';
import './setProductsPage.css'
import { useNavigate } from 'react-router-dom';
import { getReq } from '../../helpers/ReqToApi';
import ProductItem from '../../components/backoffice/productItem';



const SetProductsPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const loadProducts = async () => {
    setLoading(true);
    const response = await getReq(`/products`);
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);


  return (
    <section className="holder">
      <h2>Listado de Productos</h2><br/>
      <button onClick={()=>navigate('/backoffice/productsform')}>Agregar producto +</button>
      <table className="products-table">
        <thead>
          <th>Nombre</th>
          <th>Presentación</th>
          <th>Categoria</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Imagen</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </thead>
         {loading ? "Cargando..." : (
          products.map((item) => (
            <ProductItem
              key={item.id}
              data={item}
              loadProducts={loadProducts}
            />
          ))
        )} 
      </table>
    </section>
  );
};

export default SetProductsPage