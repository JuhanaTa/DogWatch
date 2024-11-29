
import { useContext, useState } from 'react';
import { Box, Button, CircularProgress, FormControl, IconButton, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userMsgInit } from '../reducers/UserReducer';
import { getUserBookings } from '../requests/dataRequests';
import { dataAuthInitial } from '../reducers/DataReducer';
import { SocketContext } from '../App';
import { getUserMessages } from '../requests/userRequests';
const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

function LoginForm({ setShowRegister }) {
    // normal states
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const socket = useContext(SocketContext);

    //redux states
    const { userLoginLoad, userLoginError } = useSelector((state) => state.user)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (validate()) {

            let credentials = {
                email: email,
                password: password,
            }

            dispatch(userLogin(credentials)).then(async (res) => {
                if (res.payload) {

                    try {
                        const bookings = await getUserBookings(res.payload.token)
                        dispatch(dataAuthInitial(bookings))

                        const messageSenders = await getUserMessages(res.payload.token)
                        dispatch(userMsgInit(messageSenders))

                        //Before new user can use socket disconnect the previous
                        socket.disconnect()

                        console.log('Before connecting to socket')

                        socket.connect(VITE_SOCKET_URL,
                            {
                                query: { userId: res.payload.userInfo.uuid }
                            }
                        );

                    } catch (error) {
                        dispatch(dataAuthInitial([]))
                    }

                    navigate(`/`);
                }
            })
        }
    }

    const validate = () => {
        const allErrors = {};

        if (!email.trim()) {
            allErrors.email = 'Email is required';
        }

        if (!password.trim()) {
            allErrors.password = 'Password is required';
        } else if (password.length < 8) {
            allErrors.password = 'Password must be at least 8 characters.';
        }

        setErrors(allErrors)

        return Object.keys(allErrors).length === 0;
    }

    return (

        <Box sx={{ width: '100%', height: '80vh', position: 'relative' }}>

            <Box sx={{
                minWidth: 200,
                maxWidth: 750,
                backgroundColor: 'background.paper',
                position: 'absolute',
                top: '50%',
                left: '15%',
                transform: 'translate(-10%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                p: 4,
                gap: 2
            }}>

                <Typography variant="h4" sx={{ color: 'text.primary' }}>Log In</Typography>

                <FormControl sx={{ width: '100%' }}>
                    <TextField
                        id="email-input"
                        label="User email"
                        variant="outlined"
                        value={email}
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <TextField
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}

                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            },
                        }}
                        error={!!errors.password}
                        helperText={errors.password}
                        label="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                {userLoginLoad ?
                    <CircularProgress />
                    :
                    <Button
                        sx={{ width: 100 }}
                        onClick={(e) => {
                            handleLogin(e)
                        }}
                        variant="contained"
                    >
                        Sign In
                    </Button>
                }

                {userLoginError && (
                    <Typography variant='p' color='error'>Login failed: {userLoginError}</Typography>
                )}

                <Typography align='left' variant="p" sx={{ color: 'text.primary' }}>
                    Don't have an account yet?{" "}
                    <Link onClick={() => setShowRegister(true)} color="inherit">
                        Create it now!
                    </Link>
                </Typography>

            </Box>

        </Box>

    )
}

export default LoginForm