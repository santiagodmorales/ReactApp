import { useState, useEffect } from 'react';
import React from 'react';
import './setProductsPage.css'
import { useNavigate } from 'react-router-dom';
import { getReq } from '../../helpers/ReqToApi';
import ProductItem from '../../components/backoffice/productItem';
import SlideItem from '../../components/backoffice/slideItem';



const SetCarrousel = (props) => {
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate()

  const loadSlides = async () => {
    setLoading(true);
    const response = await getReq(`/carrousel`);
    setSlides(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadSlides();
  }, []);


  return (
    <section className="holder">
      <h2>Listado de Slides</h2><br/>
      <button onClick={()=>navigate('/backoffice/slideform')}>Agregar slide +</button>
      <table className="products-table">
        <thead>
          <th>Titulo</th>
          <th>Imagen</th>
          <th>Frase</th>
          <th>Acciones</th>
        </thead>
         {loading ? "Cargando..." : (
          slides.map((item) => (
            <SlideItem
              key={item.id}
              data={item}
              loadSlides={loadSlides}
            />
          ))
        )} 
      </table>
    </section>
  );
};

export default SetCarrousel