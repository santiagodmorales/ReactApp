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
import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import Copyright from '../Copyrights';


const theme = createTheme();

export default function LoginForm() {

    const [ {user}, dispatch ] = useStateValue(); 

    const [alert, setAlert] = useState({})
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const dataForm = {
        email,
        password
      }

      console.log(dataForm)

    const signIn = async (values) => {

        try {
            const {data} = await postReq('/auth/login', dataForm)

            const {id, firstName, lastName, email, image, roleId } = data.subject
            
            sessionStorage.setItem("dataUser", JSON.stringify({id, firstName, lastName, email, image, roleId}))

            dispatch({
                type: actionTypes.SET_USER,
                user: {id, firstName, lastName, email, image, roleId},
              })

              navigate("/")
            
        } catch (error) {
            setAlert({
                msg: "El usuario o contraseña son incorrectos."
            })
            setTimeout(() =>{
                setAlert({})
            }, 5000)

            console.log(error)
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
            Iniciar Sesión
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              onChange={e=> setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={e=> setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar mis datos"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signIn}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <RouteLink to="/register">
                  {"No tenes cuenta? Registrate"}
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