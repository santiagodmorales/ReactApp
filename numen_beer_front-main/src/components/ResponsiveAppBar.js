import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {Link, useNavigate} from 'react-router-dom';
import { Badge } from '@mui/material';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import './../styles/HomePage.css'

const pages = ['Home', 'Nosotros', 'Productos', 'Tienda', 'Contacto'];



const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate()

  const [{ basket, user }, dispatch] = useStateValue();

  const handleLogout = () => {


        console.log("Sign-out successful.");
        dispatch({
          type: actionTypes.EMPTY_BASKET,
          basket: [],
        });
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });

        sessionStorage.clear();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className='nav_container'>
    <AppBar style={{ backgroundColor: "#00382A"}} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: "12%",
              maxHeight: { xs: 35, md: 60 },
            }}
            alt="Logo"
            src="images/favicon.jpg"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 70,
              letterSpacing: '.3rem',
              color: '#00382A',
              textDecoration: 'none',
            }}
          >
          
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            > 
            <MenuIcon /> 
            </IconButton> 

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color:"#00382A"}} to={`/${page}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box >
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, mx:1, color: '#D8EC8A', display: 'block' }}
              >
              <Link style={{textDecoration: "none", color:"#D8EC8A", textAlign:"center"}} to={`/${page}`}>{page}</Link>

              </Button>
            ))}
          </Box>

          <Box >
            <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
          </Box> 
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? <Avatar alt={user.firstName} src={user ? 'https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/' + user.image : ''} style={{ backgroundColor: "#D8EC8A", color: "#00382A" }}/>:
                <Button onClick={(e)=> navigate("/login")} style={{ color: "#D8EC8A", fontSize: "0.5em"}}>Ingresar</Button> }
                
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '60px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              style={{textDecoration: "none", color:"#00382A", textAlign: "right"}}
            >
                          {user && user.roleId === 1 ?
            <MenuItem onClick={handleCloseUserMenu}>
             <Button color="inherit" onClick={(e)=> navigate("/backoffice")}> Listado de Productos </Button> 
            </MenuItem>
            : null}
            {user && user.roleId === 1 ? 
            <MenuItem onClick={handleCloseUserMenu}>
            <Button color="inherit" onClick={(e)=> navigate("/backoffice/message")}> Mensajes </Button> 
            </MenuItem>
            : null}
                        {user && user.roleId === 1 ? 
            <MenuItem onClick={handleCloseUserMenu}>
            <Button color="inherit" onClick={(e)=> navigate("/backoffice/setcarrousel")}> Modificar Carrousel </Button> 
            </MenuItem>
            : null}
                <MenuItem onClick={handleCloseUserMenu}>
            {user ? <Button color="inherit" onClick={handleLogout}> Cerrar Sesión </Button> : <Button color="inherit" onClick={(e)=> navigate("/login")}> Login </Button>}
            </MenuItem>

            {!user ? <MenuItem onClick={handleCloseUserMenu}>
              <Button color="inherit" onClick={(e)=> navigate("/register")}> Registrarse </Button> 
                </MenuItem>
                : null}
            </Menu>
            <IconButton aria-label="show cart items" color="inherit">
              <Link to={"/micarrito"} style={{textDecoration: "none", color:"#D8EC8A"}} >
              <Badge badgeContent={basket?.length} color="warning">
                <ShoppingCartIcon/>
              </Badge>
              </Link>  
            </IconButton>


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
};
export default ResponsiveAppBar;



