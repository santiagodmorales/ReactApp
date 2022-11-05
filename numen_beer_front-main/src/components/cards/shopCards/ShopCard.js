import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import accounting from 'accounting';
import { makeStyles } from "@mui/styles";
import { Badge, Button, IconButton, Tooltip } from '@mui/material';
import './ShopCard.css'
import { useStateValue } from '../../../context/StateProvider';
import { actionTypes } from '../../../context/reducer';
import { Box } from '@mui/system';
import { click } from '@testing-library/user-event/dist/click';
import { Link } from 'react-router-dom';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles((theme)=>({
  root : {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "20vh",
      boxShadow: "1px 1px 3px #313843",
      marginTop: "70px",
      padding: 0,
  },
  cardHeader : {
    padding: "0px",
},
  
  card : {
      minHeight: "350px",
      maxHeight: "350px",
      minWidth: "200px"
  },

  headCard : {
    minHeight: "50px",
    maxHeight: "50px",
    maxWidth: "20%",
    textAlign: "left",
    paddingRight: "10px",

}

}))

export default function ShopCard(props) {

  const classes = useStyles()

  const [ {basket}, dispatch ] = useStateValue(); 
  const [ clickCounter, setClickCounter ] = useState(0)


  const [expanded, setExpanded] = React.useState(false);

  const { id, name, packaging, category, stock, price, image, description } = props;


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const AddToBasket = () => {
    setClickCounter(clickCounter + 1);
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
    <div className='SC_container'>
      <div className="SC_header">
          <h4>{name}</h4>
          <h6>{packaging}</h6>        
          </div>     
      <div
        className="SC_image"
        style={{ backgroundImage: `url('https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/${image}')`}}
      ></div>
    
      <Box>
      <h3 style={{ textAlign: "center" }}>{accounting.formatMoney(price, "$")}</h3>
        <Typography style={{ color: "#00382A", fontSize: "0.8em", textDecoration: "none" }}> Stock: {stock} un.</Typography>
        <Typography>Tu compra: {clickCounter} un.</Typography>
      </Box>
      <CardActions disableSpacing>
      <Button style={{ backgroundColor: "#00382A", color: "#D8EC8A", textDecoration: "none" }} onClick={AddToBasket}> Sumar al carrito! </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
                  <Tooltip title={expanded ? "Ocultar Descripción" : "Ver descripción"} sx={{ p: 0 }}>
          <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Detalles:</Typography>
          <Typography paragraph>
            {description}
          </Typography>
          
        </CardContent>
      </Collapse>
      <Link to="/micarrito">
      <Typography style={{ color: "#00382A", fontSize: "0.6em", textDecoration: "none" }}> Ir al carrito</Typography>
      </Link>
    </div>
  );
}



