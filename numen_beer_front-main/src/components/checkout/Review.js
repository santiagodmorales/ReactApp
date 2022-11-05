import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useStateValue } from '../../context/StateProvider';
import accounting from 'accounting';
import { getBasketTotal } from '../../context/reducer';
import { Box, Button } from '@mui/material';
import { actionTypes } from '../../context/reducer';
import { putReq } from '../../helpers/ReqToApi'



export default function Review() {

  const [{ basket, checkout_data, payment_data, activeStep }, dispatch] = useStateValue();

  const cardNumber = payment_data.cardNumber.slice(8, 12);

  let unifiedBasket = basket.reduce((acum, actualValue) => {
    const existingItem = acum.find(
      (e) => e.id === actualValue.id
    );

    if (existingItem) {
      return acum.map((e) => {
        if (e.id === actualValue.id) {
          return {
            ...e,
            quantity: e.quantity + actualValue.quantity,
          };
        }
        return e;
      });
    }

    return [...acum, actualValue];
  }, []);

  const handleBack = () => {
    dispatch({
      type: actionTypes.SET_STEP,
      activeStep: activeStep - 1,
    });
  };

  

  const finishShop =  () => {
    unifiedBasket.forEach( async (item)=> {
      const data_im = new FormData();
      let newStock = item.stock - item.quantity;
      data_im.append('stock', newStock );
      const actData = await putReq('/products/'+ item.id, data_im)
    })
    dispatch(
      {
      type: actionTypes.RESET_DATA,
      basket: [],
      checkout_data: [],
      payment_data: [],
    });

    dispatch({
      type: actionTypes.SET_STEP,
      activeStep: activeStep + 1,
    });

  }



  return (
    <>
      <Typography variant="h6" gutterBottom>
        Tu orden:
      </Typography>
      <List disablePadding>
        {unifiedBasket.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={`${product.quantity} - ${product.name}`} />
            <Typography variant="body2">{accounting.formatMoney(product.price, "$" )}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {accounting.formatMoney(getBasketTotal(basket), "$" )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos de Envio:
          </Typography>
          <Typography gutterBottom>{checkout_data.firstName} {checkout_data.lastName}</Typography>
          <Typography gutterBottom>{checkout_data.address1} {checkout_data.address2}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos de Pago:
          </Typography>
          <Grid container>
              <>
                <Grid item xs={12} >
                  <Typography gutterBottom>{payment_data.cardName}</Typography>
                </Grid>
                <Grid item xs={12} >
                  <Typography gutterBottom>{cardNumber ? "XXXX - XXXX" - cardNumber : "S/D" }</Typography>
                </Grid>
              </>

          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} style={{ backgroundColor: "#D8EC8A", color: "#00382A"}}>
              Volver
            </Button>
            <Button
              variant="contained"
              onClick={()=>finishShop()}
              sx={{ mt: 3, ml: 1 }}
              style={{ backgroundColor: "#00382A", color: "#D8EC8A"}}
            >
              Confirmar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}