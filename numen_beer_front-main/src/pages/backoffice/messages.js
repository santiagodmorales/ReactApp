import { useState, useEffect } from 'react';
import React from 'react';
import './setProductsPage.css'
import { useNavigate } from 'react-router-dom';
import { getReq } from '../../helpers/ReqToApi';
import MessageItem from '../../components/backoffice/messageItem';



const MessagesPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate()

  const loadMessages = async () => {
    setLoading(true);
    const response = await getReq(`/contacts`);
    setMessages(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);


  return (
    <section className="holder">
      <h2>Listado de Mensajes</h2><br/>
      <table className="products-table">
        <thead>
          <th>Nombre</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Mensaje</th>
          <th>Acciones</th>
        </thead>
         {loading ? "Cargando..." : (
          messages.map((item) => (
            <MessageItem
              key={item.id}
              data={item}
              loadMessages={loadMessages}
            />
          ))
        )} 
      </table>
    </section>
  );
};

export default MessagesPage