import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouteLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postReq } from '../../helpers/ReqToApi';
import * as Yup from 'yup';
import Copyright from '../Copyrights';
import { EmailSenderRegister } from '../../helpers/EmailSender';



const theme = createTheme();

export default function RegistrationForm() {

    
    const navigate = useNavigate();

    const [alert, setAlert] = useState({})
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

      const dataForm = {
      firstName,
      lastName,
      email,
      password
    }

    const validationSchema = Yup.object({
      firstName: Yup.string()
      .required('Required'),

      lastName: Yup.string()
      .required('Required'),

      email: Yup.string()
      .email('Invalid email format')
      .required('Required'),

      password: Yup.string().required('Required')
      .min(6, 'Must have at least 6 characters'),
      
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Required'),
  })

    console.log(dataForm)

    const signUp = async () => {

      try {
      const {data} = await postReq('/auth/register', dataForm)
      await postReq('/auth/login', dataForm)

      EmailSenderRegister(dataForm)

      
      const {id, firstName, lastName, email, image, roleId } = data.subject


      sessionStorage.setItem("dataUser", JSON.stringify({id, firstName, lastName, email, image, roleId}))

      navigate('/');

    } catch (error) {
        error.response.data.errors.map(err => {
          return(
          setAlert({
            msg: err.msg
          }))
        })
        
      setTimeout(() =>{
          setAlert({})
      }, 5000)
    }

    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  onChange={e=> setFirstName(e.target.value)}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  onChange={e=> setLastName(e.target.value)}
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={e=> setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={e=> setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Me gustaria recibir promociones y novedades vía email."
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signUp}
            >
              Registrarme
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouteLink to="/login">
                  Ya tenes cuenta? Iniciá sesión
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}