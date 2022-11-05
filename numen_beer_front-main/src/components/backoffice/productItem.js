import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { delReq } from "../../helpers/ReqToApi";

const ProductItem = (props) => {

  const { data, loadProducts } = props;

  const navigate = useNavigate()

// función para eliminar novedad
  const deleteNew = async (id) => {
    try {
      await delReq(`/products/${id}`);
      loadProducts()
    } catch (err) {
      console.log(err);
    }
  };

// función de confirmación para Sweet Alert 2
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Estas a punto de borrar un producto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar producto!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNew(id);
      }
    });
  };

  return (
    <>
      <tbody>
        <th scope="row" style={{ display: "none" }}>{data.id}</th>
        <td>{data.name}</td>
        <td>{data.packaging}</td>
        <td>{data.category}</td>
        <td>{data.stock}</td>
        <td>{data.price}</td>
        <td><img src={'https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/' + data.image} style={{ width: "50px", height: "50px" }}/></td>
        <td>{data.description}</td>
        <td class="acciones">
          
            <MdOutlineDeleteOutline style={{fontSize: "1.2em"}} className="icon" onClick={() => {
              confirmDelete(data.id);
            }}/>
          
          <FiEdit style={{fontSize: "1.2em"}} className="icon" onClick={() => {navigate(`/backoffice/productsform/${data.id}`)}}/>
        </td>
      </tbody>

    </>
  );
};

export default ProductItem;