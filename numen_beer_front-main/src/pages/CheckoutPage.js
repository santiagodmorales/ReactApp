import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Total from "../components/Total";
import { useStateValue } from "../context/StateProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import accounting from "accounting";
import { actionTypes } from "../context/reducer";
import { Box } from "@mui/system";
import { Badge, Button, IconButton, Tooltip } from "@mui/material";
import {TiDelete} from 'react-icons/ti'
import { RiDeleteRow } from 'react-icons/ri'
import {FiPlusSquare, FiMinusSquare} from 'react-icons/fi'
import Swal from "sweetalert2";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



const CheckoutPage = () => {

  const [{ basket,}, dispatch] = useStateValue();
  const [ activeButton, setActiveButton ] = React.useState(false)

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

  const getSubtotal = (cant, price) => {
    return cant * price;
  }

  const removeItem = (id) => {
    dispatch({
      type: actionTypes.DEL_FROM_BASKET,
      id : id
    })
  }

  console.log(unifiedBasket)

  const removeRow = (id) => {
    dispatch({
      type: actionTypes.DEL_PROD_FROM_BASKET,
      id : id
    })
  }

  const addItem = (id) => {
    dispatch({
      type: actionTypes.ADD_ONE_TO_BASKET,
      id : id
    })
  };

const deleteAlert = ()=>{
  Swal.fire({
    title: 'Esta acción eliminará tu compra por completo',
    showCancelButton: true,
    confirmButtonText: 'Continuar',
    backgroundColor: "#D8EC8A",
    color: "#00382A",
    confirmButtonColor: "#00382A",
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
  })
}})};

const overStock = (id)=>{
  Swal.fire({
    title: 'Su pedido supera el stock disponible',
    confirmButtonText: 'Entendido',
    backgroundColor: "#D8EC8A",
    color: "#00382A",
    confirmButtonColor: "#00382A",
  }).then((result) => {
    if (result.isConfirmed) {
      removeItem(id)
      setActiveButton(true)
      setTimeout(() =>{
        setActiveButton(false)
      }, 5000)
}})};


  function FormRow() {
    return (

        <Box sx={{ flexGrow: 1 }} style={{marginBottom: "20px", marginTop: "20px"}}>
        <TableContainer component={Paper}  style={{ marginLeft: "20px", maxWidth: "95%", padding: "0px"}}>
          <Table item xs={12} sm={6} md={3} size="small" style={{ marginLeft: "20px", maxWidth: "95%", padding: "0px"}} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Tooltip title="Eliminar compra" placement="top">
                    <IconButton onClick={()=> deleteAlert()}>
                      <TiDelete style={{ fontSize: "1em", color: "#B00000"}} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>Producto</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unifiedBasket.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                  <Tooltip title="Eliminar fila" placement="left">
                    <IconButton onClick={()=>removeRow(row.id)}>
                      <RiDeleteRow style={{ color: "D8EC8A"}} />
                      </IconButton>
                      </Tooltip>
                      </TableCell>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="center"><IconButton onClick={()=> removeItem(row.id)} ><FiMinusSquare style={{ fontSize: "1em", color: "#00382A"}}/> </IconButton>{row.quantity}<IconButton onClick={()=> addItem(row.id) }><FiPlusSquare style={{ fontSize: "1em", color: "#00382A"}}/></IconButton></TableCell>
                  <TableCell align="right">{accounting.formatMoney(row.price, "$") }</TableCell>
                  <TableCell align="right">{accounting.formatMoney(getSubtotal(row.quantity, row.price), "$" )}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    );
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" style={{ marginBottom: "50px", marginTop: "30px"}} gutterBottom variant="h4">
            Mi compra
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9} container spacing={2}>
          <FormRow />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <Total />

        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutPage;
