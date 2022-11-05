import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { delReq } from "../../helpers/ReqToApi";

const SlideItem = (props) => {

  const { data, loadSlides } = props;

  const navigate = useNavigate()

// función para eliminar novedad
  const deleteSlide = async (id) => {
    try {
      await delReq(`/carrousel/${id}`);
      loadSlides()
    } catch (err) {
      console.log(err);
    }
  };

// función de confirmación para Sweet Alert 2
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Estas a punto de borrar este slide!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar slide!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSlide(id);
      }
    });
  };

  return (
    <>
      <tbody>
        <th scope="row" style={{ display: "none" }}>{data.id}</th>
        <td>{data.title}</td>
        <td><img src={'https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/' + data.image} style={{ width: "50px", height: "50px" }}/></td>
        <td>{data.phrase}</td>
        <td class="acciones">
            <MdOutlineDeleteOutline style={{fontSize: "1.2em"}} className="icon" onClick={() => {
              confirmDelete(data.id);
            }}/>    
          <FiEdit style={{fontSize: "1.2em"}} className="icon" onClick={() => {navigate(`/backoffice/slideform/${data.id}`)}}/>
        </td>
      </tbody>

    </>
  );
};

export default SlideItem;