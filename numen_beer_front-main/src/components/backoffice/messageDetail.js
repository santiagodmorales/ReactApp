import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getReq } from "../../helpers/ReqToApi";
import { Button } from "@mui/material";

function MessageDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState({});

  useEffect(() => {
    getMessageDetail();
  }, []);

  const getMessageDetail = async () => {
    try {
      const res = await getReq(`/contacts/${id}`);
      setMessage(res.data);
    } catch (err) {
      Swal.fire("Error 404", "El mensaje no existe", "error");
      navigate("/backoffice/message");
    }
  };

  return (
      <div className="main_container">
            <h5>Mensaje de: {message.firstName} {message.lastName}</h5>
            <p>{message.message}</p>
            <h5>Datos de Contacto:</h5>
            <p> Email: {message.email}</p>
            <p> Teléfono: {message.phone}</p>
          <Button style={{ backgroundColor: "#00382A", color: "#D8EC8A"}} onClick={()=>navigate('/backoffice/message')}>Volver a listado de mensajes</Button>
            
      </div>

  );
}

export default MessageDetailsPage