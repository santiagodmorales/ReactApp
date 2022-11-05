import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { dataSlick } from './carruselData';
import './carrusel.css';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { getReq } from "../../helpers/ReqToApi";


// botones personalizados 

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return(
    <div className={className} onClick={onClick}>
      <ArrowBackIos className="iconSlick"/>
    </div>
  );
};

const NextBtn = (props) => {
  const {className, onClick} = props;
  return(
    <div className={className} onClick={onClick}>
      <ArrowForwardIos className="iconSlick"/>
    </div>
  );
};

const Carrusel = () => {

  const [ carrouselData, setCarrouselData ] = useState([])


  const getCarrouselData = async () => {
    try {
      const response = await getReq('/carrousel');
      setCarrouselData(response.data)

    } catch (error) {
      console.log (error)
    };
  }

  useEffect(() => {
    getCarrouselData();
  }, []);



    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <NextBtn />,
        prevArrow: <PreviousBtn />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
  return (

   <div className="container_slinder">
        <div className="title">
          <h2>@Numen Beer en Instagram</h2>
        </div>
        <Slider {...settings}>
          {carrouselData.map(item =>(
                <figure className="cards" key={item.id}>
                  <div className="cards_img">
                    <img src={'https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/' + item.image} alt={item.title} />
                  </div>
                  <h5>{item.phrase}</h5>
                </figure>
              )
            )
          }
        </Slider>
      </div>
  )
}

export default Carrusel
