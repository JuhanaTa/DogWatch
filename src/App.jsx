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
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Profile from './views/Profile';
import PublicProfile from './views/PublicProfile';
import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { updateReceivedMsg, updateSentMsg, userInitial, userLogout, userMsgInit } from './reducers/UserReducer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import DataReducer, { dataAuthInitial, dataInitial } from './reducers/DataReducer';
import { createContext, useEffect, useState } from 'react';
import { getServices, getSittersDataFetch, getUserBookings } from './requests/dataRequests';
import { getUserMessages, userDataFetch } from './requests/userRequests';
import io from 'socket.io-client'
const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;


export const SocketContext = createContext();

function App() {

  const authMiddleware = ({ dispatch }) => (next) => (action) => {
    console.log('action happened', action, action.error?.message)
    if (action.type.endsWith('rejected') && action.error?.message === "Request failed with status code 401") {
      // Trigger logout action on 401 response
      dispatch(userLogout());
      socket.disconnect()
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

  console.log('creating socket connection', VITE_SOCKET_URL)
  const socket = io.connect(VITE_SOCKET_URL,
    {
      query: userUUID ? { userId: userUUID } : {},
    }
  );

  const AppInit = () => {
    const dispatch = useDispatch();
    const { userMessages } = useSelector((state) => state.user);
    const [waitInit, setWaitInit] = useState(true)
    const [pageError, setPageError] = useState(null)

    useEffect(() => {

      const fetchInitialData = async () => {

        try {

          if (userUUID && token) {
            const userPersonalData = await userDataFetch(userUUID)
            dispatch(userInitial({ userInfo: userPersonalData }))

            const messageSenders = await getUserMessages(token)
            dispatch(userMsgInit(messageSenders))
            console.log('All user messages', messageSenders)
          }

          const sitters = await getSittersDataFetch()
          const services = await getServices()
          const initSearchParams = {
            service: services.length > 0 ? services[0] : "",
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

          if (error.status === 401) {
            //Server returns 401 if token is no more valid.
            //Logout in such case
            socket.disconnect()
            dispatch(userLogout())
            setWaitInit(false)
          } else {
            setPageError('App load failed: ' + error.message)
          }

        }
      };

      fetchInitialData();

    }, []);


    const performMessagesUpdate = async() => {
      const messageSenders = await getUserMessages(token)
      dispatch(userMsgInit(messageSenders))
    }


    useEffect(() => {
      socket.on("receiveMessage", (data) => {
        console.log('received message!!!', data)

        if(userMessages.some(message => message.partnerId === data.senderId)){
          dispatch(updateReceivedMsg(data))
        } else {
          performMessagesUpdate()
        }
      })
  
      socket.on("sendMessage", (data) => {
        console.log('I send a message!', data)

        if(userMessages.some(message => message.partnerId === data.receiverId)){
          dispatch(updateSentMsg(data))
        } else {
          performMessagesUpdate()
        }
        
      })
    }, [socket]);

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

              <Routes basename="/DogWatch/">
                <Route path="/DogWatch/" element={<MainPage />} />

                <Route path="/DogWatch/publicprofile/:uuid" element={<PublicProfile />} />
                <Route path="/DogWatch/search" element={<Search />} />
                <Route path="/DogWatch/contact" element={<Contact />} />
                <Route path="/DogWatch/login" element={<Login />} />

                <Route
                  path="/DogWatch/profile"
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
      return <Navigate to="/DogWatch/login" replace />;
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
      <SocketContext.Provider value={socket}>
        <AppInit>
        </AppInit>
      </SocketContext.Provider>
    </Provider >
  )
}

export default App