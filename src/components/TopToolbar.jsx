import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, Avatar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../reducers/UserReducer'

function TopToolbar() {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  //const [user, setUser] = useState(getUserData())

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

  const { user, userLoading, userError } = useSelector((state) => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogout = () => {
    dispatch(userLogout());
    handleCloseUserMenu()
    navigate(`/`);
  };


  return (
      <AppBar position="fixed" color='secondary' elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

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

            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <img style={{ width: 300 }} src={Logo} />
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none'} }}>
              <img style={{ width: 200 }} src={Logo} />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button>
                <Link component={RouterLink} to="/" color="primary" sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}>Home</Link>
              </Button>
              <Button>
                <Link component={RouterLink} to="/search" color="primary" sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}>Search</Link>
              </Button>
              <Button>
                <Link component={RouterLink} to="/contact" color="primary" sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}>Contact</Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              {user && <Typography>{user.email}</Typography>}
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