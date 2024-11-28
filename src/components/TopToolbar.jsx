import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, Avatar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../reducers/UserReducer'
import { SocketContext } from '../App';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function TopToolbar() {

  const { user } = useSelector((state) => state.user)
  const socket = useContext(SocketContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  console.log('current user', user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogout = () => {
    socket.disconnect()
    dispatch(userLogout());
    handleCloseUserMenu()
    navigate(`/`);
  };


  return (
    <AppBar position="fixed" color='secondary' elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', height: 80, alignItems: 'center' } }}>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ height: 50 }}
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >

              <MenuItem onClick={handleCloseNavMenu}>
                <Link component={RouterLink} to="/" color="primary" sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}>Home</Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link component={RouterLink} to="/search" color="primary" sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}>Search</Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link component={RouterLink} to="/contact" color="primary" sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}>Contact</Link>
              </MenuItem>

            </Menu>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <img style={{ width: 180, height: 55 }} src={Logo} />
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img style={{ width: 300 }} src={Logo} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Link
              component={RouterLink}
              to="/"
              color="primary"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
              type='button'
              fontWeight='bold'
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to="/search"
              color="primary"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
              type='button'
              fontWeight='bold'
            >
              Search
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              color="primary"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
              type='button'
              fontWeight='bold'
            >
              Contact
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user ? user.name : "profile"} src={
                  user && VITE_IMAGE_URL + "/" + user.avatar
                } />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link component={RouterLink} to="/profile" color="primary" sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}>

                <MenuItem onClick={handleCloseUserMenu}>

                  <Typography sx={{ textAlign: 'center' }}>Profile</Typography>

                </MenuItem>

              </Link>


              {!user &&
                <Link component={RouterLink} to="/Login" color="primary" sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}>
                  <MenuItem onClick={handleCloseUserMenu}>

                    <Typography sx={{ textAlign: 'center' }}>Login</Typography>

                  </MenuItem>
                </Link>
              }

              {user &&
                <MenuItem onClick={(e) => handleUserLogout(e)}>

                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>

                </MenuItem>
              }
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopToolbar