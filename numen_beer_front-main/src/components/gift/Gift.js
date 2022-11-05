import Button from "../button/Button"
import "./gift.css"



const Gift = () => {
  return (
    <>
      <div className="gift_container">
        <div className="text_container">
          <h2>GIFT CARD </h2>
          <p>
            <span>
              Si no sabés que regalar, <br />
              ¡esta Gift Card es la solución!<br /><br />
            </span>
            La manera perfecta de poner una sonrisa en un rostro,<br /> 
            es regalar unas buenas Numen Beer!!!.Entregada directamente en su puerta.<br />
            Para comprar para un grupo de personas, póngase en contacto <br /> y podemos discutir 
            paquetes a medida <br />y mensajes personalizados.
          </p>
          <Button text="Comprar Ahora" className="primary" url='Tienda'/>
        </div>
        <div className="img_container">
            <img src="./images/oferta.jpg" alt="cerveza" />
        </div>
      </div>
    </>
  )
}

export default Gift