import { useState } from 'react'
import Logo from './assets/logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import MainPage from './views/MainPage';
import Login from './views/Login';
import { Link as RouterLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Contact from './views/Contact';
import Search from './views/Search';
import Footer from './components/Footer';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link} from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';



//Changes to LINKs later
const settings = ['Profile', 'Bookings', 'Logout'];

function App() {

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

  return (
    <ThemeProvider theme={theme}>
      <Router>

        <Box>
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
                
                <img src={Logo} />

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
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

              </Toolbar>
            </Container>
          </AppBar>
        </Box>

        <div className='content'>
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
        
        <Box sx={{ height: '464px', backgroundColor: 'primary.main'}}>
          <Footer></Footer>
        </Box>


      </Router>
    </ThemeProvider>
  )
}

export default App
