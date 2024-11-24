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
import { Box, CircularProgress, Typography } from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Profile from './views/Profile';
import PublicProfile from './views/PublicProfile';
import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { userInitial, userLogout } from './reducers/UserReducer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import DataReducer, { dataAuthInitial, dataInitial } from './reducers/DataReducer';
import { useEffect, useState } from 'react';
import { getServices, getSittersDataFetch, getUserBookings } from './requests/dataRequests';
import { userDataFetch } from './requests/userRequests';


function App() {

  const authMiddleware = ({ dispatch }) => (next) => (action) => {
    console.log('action happened', action, action.error?.message)
    if (action.type.endsWith('rejected') && action.error?.message === "Request failed with status code 401") {
      // Trigger logout action on 401 response
      dispatch(userLogout());
    }

    return next(action);
  };


  const store = configureStore({
    reducer: {
      user: UserReducer,
      data: DataReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authMiddleware),
  })

  const token = localStorage.getItem('token');
  const userUUID = localStorage.getItem('userUUID');


  const AppInit = () => {
    const dispatch = useDispatch();

    const [waitInit, setWaitInit] = useState(true)
    const [pageError, setPageError] = useState(null)

    useEffect(() => {

      const fetchInitialData = async () => {

        try {

          if (userUUID) {
            const userPersonalData = await userDataFetch(userUUID)
            dispatch(userInitial({ userInfo: userPersonalData }))
          }

          const sitters = await getSittersDataFetch()
          const services = await getServices()
          const initSearchParams = {
            service: services[0],
            location: 'Helsinki',
            rating: 0
          }
          dispatch(dataInitial({ sitters: sitters, services: services, initSearchParams: initSearchParams }))

          if (token) {
            const bookings = token ? await getUserBookings(token) : []
            dispatch(dataAuthInitial(bookings))

          }

          setWaitInit(false)

        } catch (error) {
          console.log('error', error)

          if(error.status === 401){
            //Server returns 401 if token is no more valid.
            //Logout in such case
            dispatch(userLogout())
            setWaitInit(false)
          } else {
            setPageError('App load failed: ' + error.message)
          }

        }
      };

      fetchInitialData();

    }, []);

    if (pageError) {
      return <Typography align='left' variant='h4'>{pageError}</Typography>
    } else if (waitInit) {
      return <CircularProgress />;
    } else {
      console.log('returnin app')
      return (
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
      )
    }


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
      </AppInit>
    </Provider >
  )
}

export default App