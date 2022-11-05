import React from "react";
import Button from "../../button/Button";
import "./quickShopCard.css";
import accounting from "accounting";
import { useStateValue } from "../../../context/StateProvider";
import { actionTypes } from "../../../context/reducer";
import { useNavigate } from "react-router-dom";

const QuickShopCard = (props) => {
  const { id, name, packaging, category, stock, price, image, description } = props;

  const [ {basket}, dispatch ] = useStateValue(); 
  
  const navigate = useNavigate()
  

  const AddToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id,
        name,
        packaging,
        category,
        stock,
        price,
        description,
        image,
        quantity: 1
      }
    })


  }

  return (
    <>
      <div key={id}
        className="QC_container">
        <div className="QC_image" style={{
          backgroundImage: `url('https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/${image}')`,
        }}
      ></div>
        <div className="QC_info">
          <h5>{name}</h5>
          <p>{accounting.formatMoney(`${price}`, "$" )}</p>
          <Button text="Comprar ahora!" className="secondary" onClick={AddToBasket}/>
        </div>
      </div>
    </>

  );
};

export default QuickShopCard