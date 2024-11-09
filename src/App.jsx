import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import MainPage from './views/MainPage';
import Login from './views/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Contact from './views/Contact';
import Search from './views/Search';
import Footer from './components/Footer';
import TopToolbar from './components/TopToolbar';
import { Box } from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Profile from './views/Profile';
import PublicProfile from './views/PublicProfile';
import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/UserReducer';
import { Provider } from 'react-redux';


function App() {

  const store = configureStore({
    reducer: {
      user: UserReducer
    }
  })


  return (
    <Provider store={store}>

      <ThemeProvider theme={theme}>

        <Router>

          <TopToolbar></TopToolbar>

          <Box className='content'>
            <Routes>
              <Route path="/publicprofile" element={<PublicProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </Box>

          <Box sx={{ height: '464px', backgroundColor: 'primary.main' }}>
            <Footer></Footer>
          </Box>

        </Router>

      </ThemeProvider>

    </Provider>
  )
}

export default App