import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import MainPage from './views/MainPage';
import Login from './views/Login';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Contact from './views/Contact';
import Search from './views/Search';
import Footer from './components/Footer';
import TopToolbar from './components/TopToolbar';
import { Box, CircularProgress } from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Profile from './views/Profile';
import PublicProfile from './views/PublicProfile';
import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { userInit } from './reducers/UserReducer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import DataReducer, { dataInit } from './reducers/DataReducer';
import { useEffect } from 'react';


function App() {

  const store = configureStore({
    reducer: {
      user: UserReducer,
      data: DataReducer
    }
  })

  const token = localStorage.getItem('token');
  const userUUID = localStorage.getItem('userUUID');


  const AppInit = ({ children }) => {
    const dispatch = useDispatch();
    const { userInitLoad } = useSelector((state) => state.user);
    const { dataInitLoad } = useSelector((state) => state.data)

    useEffect(() => {

      const fetchData = async () => {

        console.log('userUUID', userUUID)
        //Initial user data
        await dispatch(userInit(userUUID))

        //Initial app data
        await dispatch(dataInit(token))

      };

      fetchData();

    }, [token, dispatch]);

    if (userInitLoad || dataInitLoad) {
      return <CircularProgress />;
    }
    return children;

  };

  const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  //Guarantee that navigation causes screen to go up
  const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  };


  return (
    <Provider store={store}>
      <AppInit>
        <ThemeProvider theme={theme}>

          <Router>
            <ScrollToTop></ScrollToTop>

            <TopToolbar></TopToolbar>

            <Box className='content'>

              <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/publicprofile/:uuid" element={<PublicProfile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

              </Routes>

            </Box>

            <Box sx={{
              backgroundColor: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              p: 10
            }}>
              <Footer></Footer>
            </Box>

          </Router>

        </ThemeProvider>
      </AppInit>
    </Provider>
  )
}

export default App