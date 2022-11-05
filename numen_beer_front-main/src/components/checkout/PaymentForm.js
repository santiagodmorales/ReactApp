import { React, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { actionTypes } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Swal from "sweetalert2";

export default function PaymentForm() {
  const [{ checkout_data, activeStep }, dispatch] = useStateValue();

  console.log(checkout_data);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleBack = () => {
    dispatch({
      type: actionTypes.SET_STEP,
      activeStep: activeStep - 1,
    });
  };

  const setPayData = () => {
    dispatch({
      type: actionTypes.SET_PAY_DATA,
      payment_data: {
        cardName,
        cardNumber,
        expDate,
        cvv,
      },
    });
    if(cardName === "" || cardNumber === "" || expDate === "" || cvv === ""){
      notDataAlert();
    } else {
      dispatch({
        type: actionTypes.SET_STEP,
        activeStep: activeStep + 1
      })
    }

  }

  const notDataAlert = ()=>{
    Swal.fire({
      title: '¡Los datos estan incompletos!',
      showCancelButton: true,
      cancelButtonText: 'Completar datos',
      confirmButtonText: 'Ignorar y continuar',
      backgroundColor: "#D8EC8A",
      color: "#00382A",
      confirmButtonColor: "#00382A", 
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: actionTypes.SET_STEP,
          activeStep: activeStep + 1
        })
}})};
  


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Datos de pago:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={cardName}
            required
            id="cardName"
            label="Nombre en la Tarjeta"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={(e) => setCardName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={cardNumber}
            required
            id="cardNumber"
            label="N° de Tarjeta"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={expDate}
            required
            id="expDate"
            label="Fecha Vto."
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={cvv}
            required
            id="cvv"
            label="CVV"
            helperText="Los 3 digitos que aparecen atras"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={(e) => setCvv(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Recordar mis datos para las proximas compras"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} style={{ backgroundColor: "#D8EC8A", color: "#00382A"}}>
              volver
            </Button>
            <Button
              variant="contained"
              onClick={(e) => setPayData()}
              sx={{ mt: 3, ml: 1 }}
              style={{ backgroundColor: "#00382A", color: "#D8EC8A"}}
            >
              Siguiente
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
