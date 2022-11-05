import React, { useEffect } from "react";
import { AiFillRead } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { delReq } from "../../helpers/ReqToApi";

const MessageItem = (props) => {

  const { data, loadMessages } = props;

  const navigate = useNavigate()


// función para eliminar novedad
  const deleteMsg = async (id) => {
    try {
      await delReq(`/contacts/${id}`);
      loadMessages()
    } catch (err) {
      console.log(err);
    }
  };

// función de confirmación para Sweet Alert 2
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Estas a punto de borrar este mensaje!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar mensaje!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMsg(id);
      }
    });
  };

  return (
    <>
      <tbody>
        <th scope="row" style={{ display: "none" }}>{data.id}</th>
        <td>{data.firstName} {data.lastName}</td>        

        <td>{data.email}</td>
        <td>{data.phone}</td>
        <td>{data.message}</td>
        <td class="acciones">
          
            <MdOutlineDeleteOutline style={{fontSize: "1.2em"}} className="icon" onClick={() => {
              confirmDelete(data.id);
            }}/>
          
          <AiFillRead style={{fontSize: "1.2em"}} className="icon" onClick={() => {navigate(`/backoffice/message/${data.id}`)}}/>
        </td>
      </tbody>

    </>
  );
};

export default MessageItem;