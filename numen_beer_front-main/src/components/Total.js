import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { getBasketTotal } from "../context/reducer";
import accounting from "accounting";
import { useStateValue } from "../context/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme)=>({
    root : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "25vh",
        boxShadow: "1px 1px 3px #313843",
        margin: "5px",
        padding: "0"
    },
    
    button : {
        backgroundColor: "#D8EC8A",
        color: "#00382A",
        "&:hover" : {
        backgroundColor: "#00382A",
        color: "#D8EC8A"
        }
    },
    amount : {
        fontSize: "2rem",
        margin: "0.5rem",
        color: "#00382A"
    }


}))

const Total = () => {

    const [ {basket, user}, dispatch ] = useStateValue(); 
    const navigate = useNavigate();

 
    const finishShop = () => {
        if (user) {
            navigate("/checkout")
        } else {
            Swal.fire({
                title: 'Para continuar debes iniciar sesión',
                showCancelButton: true,
                confirmButtonText: 'Iniciar sesión',
                backgroundColor: "#D8EC8A",
                color: "#00382A",
                confirmButtonColor: "#00382A",
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate("/login")
            }})};
        }
    

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h5>Total items : {basket?.length}</h5>
        <h3 className={classes.amount}>{accounting.formatMoney(getBasketTotal(basket), "$" )}</h3>
        <Button onClick={()=>finishShop()} className={classes.button} variant="contained">Finalizar Compra</Button>
        </div>
    )
}

export default Total;