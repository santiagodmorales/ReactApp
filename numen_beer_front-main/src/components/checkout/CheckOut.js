import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { actionTypes } from "../../context/reducer";
import { useStateValue } from '../../context/StateProvider';
import { useNavigate } from 'react-router-dom';
import Copyright from '../Copyrights';
import { Grid } from '@mui/material';
import { EmailSenderCheckout } from '../../helpers/EmailSender';

const steps = ['Datos de envio', 'Datos de Pago', 'Revisá tu orden!'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {

  const navigate = useNavigate()

  const [{ basket, checkout_data, payment_data, user, activeStep }, dispatch] = useStateValue();


  const resetData = ()=> {

    let dataEmail = {
      firstName: user.firstName,
      email: user.email,
      buyOrder
    }


    EmailSenderCheckout(dataEmail)
  dispatch(
    {
    type: actionTypes.RESET_DATA,
    activeStep: 0
  });
  navigate("/")
  }

  let buyOrder = parseInt(Math.random()*100000000);

  console.log(buyOrder)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Datos de envio y facturación
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === 3 ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por tu compra.
                </Typography>
                <Typography variant="subtitle1">
                  Tu numero de orden es: {buyOrder}. Te enviamos un email con la confirmación de tu compra y en breve te informaremos la fecha de entrega.
                </Typography>
                <Box style={{ textAling: "center", display: "flex", justifyContent: "center"}} >
                 <Button variant="contained" color="primary" onClick={()=>resetData()} style={{ backgroundColor: "#00382A", color: "#D8EC8A"}}>Volver a la tienda</Button>
                 </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
 
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}