import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { postReq } from "../helpers/ReqToApi";

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label style={{ width: "100%", marginTop: "10px", textAlign: "left"}} htmlFor={props.id || props.name}>{label}</label>
      <textarea style={{ height: "40%", fontFamily: 'Titillium Web'}} className="textarea-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error" style={{color:'red'}}>{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
    <div style={{minWidth: "95%", display: "flex", justifyContent: "left", textAlign:"left", alignItems: "center", margin: "5px"}}>
      <label style= {{ width: "30%"}} htmlFor={props.id || props.name}>{label}</label>
      <input style= {{ width: "70%", height: "1.5em"}} className="text-input" {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (
        <div className="error" style={{color:'red'}}>{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error" style={{color:'red'}}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const ContactForm = () => {

  const [ sending, setSending ] = useState(false)

  return (
    <>
    <Container maxWidth="sm" style={{backgroundColor:'#D8EC8A', textAlign:'center', padding: 0, marginTop: "15px"}}>
        <h2 style={{color:'#3A724D', margin: "0px"}}>Contactanos!</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            message: "",
            acceptedTerms: false,
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Máximo 15 caracteres!")
              .required("Requerido!"),
            lastName: Yup.string()
              .max(20, "Máximo 20 caracteres!")
              .required("Requerido!"),
            phone: Yup.string()
              .min(10, "Mínimo 10 caracteres!")
              .required("Requerido!"),  
            email: Yup.string()
              .email("Dirección email incorrecta!")
              .required("Requerido!"),
            acceptedTerms: Yup.boolean()
              .required("Requerido!")
              .oneOf([true], "Debe aceptar términos y condiciones!"),
            message: Yup.string()
              .min(15, "Mínimo 15 caracteres!")
              .required("Requerido!"),
          })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
          
              try {
                setSending(true)
                await postReq('/contacts', values)
                resetForm();
                setSending(false)
                setSubmitting(false);
              } catch (error) {
                setTimeout(() =>{
                  alert(error)
                }, 5000)
                }
                
              }}
        > 
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              height: "75vh",
              fontWeight: "bold",
              padding: "10px"
            }}
          >
            <MyTextInput
              label="Nombre"
              name="firstName"
              type="text"
            />

            <MyTextInput
              label="Apellido"
              name="lastName"
              type="text"
            />

            <MyTextInput
              label="Telefono"
              name="phone"
              type="int"
            />

            <MyTextInput
              label="Dirección de Email"
              name="email"
              type="email"
            />

            <MyCheckbox name="acceptedTerms">
              Aceptar términos y condiciones
            </MyCheckbox>

            <MyTextArea
              label="Deje su consulta"
              name="message"
              placeholder="Comentarios..."
            />
            <Button type="submit" variant="contained"  color="success" style={{backgroundColor:'#00382A'}} >
              Enviar
            </Button>
          </Form>
        </Formik>

      </Container>
      {sending ? 
              <div style={{ position: "absolute", width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#000", opacity: "50%", color: "#fff"}}>
              <img src='./images/loader.gif' /> Enviando...
              </div> : ""}
              </>
  );
};
export default ContactForm;
