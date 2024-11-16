import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import MainPage from './views/MainPage';
import Login from './views/Login';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
import { Provider, useSelector } from 'react-redux';
import SearchReducer from './reducers/SearchReducer';


function App() {

  const store = configureStore({
    reducer: {
      user: UserReducer,
      search: SearchReducer
    }
  })

  const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);

    //
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };


  return (
    <Provider store={store}>

      <ThemeProvider theme={theme}>

        <Router>

          <TopToolbar></TopToolbar>

          <Box className='content'>

            <Routes>
              <Route path="/publicprofile/:userId" element={<PublicProfile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<MainPage />} />

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

    </Provider>
  )
}

export default App