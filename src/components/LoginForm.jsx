
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../reducers/UserReducer';

function LoginForm({ setShowRegister }) {
    // normal states
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //redux states
    const { loading, error } = useSelector((state) => state.user)

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

        let credentials = {
            firstname: 'Tester',
            lastname: 'Testing',
            username: 'Test',
            desc: 'This is test desc',
            email: email,
            password: password
        }

        dispatch(userLogin(credentials)).then((result) => {
            if (result.payload) {
                navigate(`/`)
            }
        })
    }

    return (

        <Box sx={{ width: '100%', height: '80vh', position: 'relative' }}>

            <Box sx={{
                width: '45vw',
                maxWidth: 700,
                backgroundColor: 'background.paper',
                position: 'absolute',
                top: '50%',
                left: '15%',
                transform: 'translate(-10%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                p: 4
            }}>

                <Typography variant="h4" sx={{ color: 'text.primary' }}>Log In</Typography>

                <FormControl sx={{ m: 1, width: '25ch' }}>
                    <TextField
                        id="user-input"
                        label="Username or email address..."
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Create Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
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
                            </InputAdornment>
                        }
                        label="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                {loading ?
                    <CircularProgress />
                    :
                    <Button
                        sx={{ width: 100, m: 1 }}
                        onClick={(e) => {
                            handleLogin(e)
                        }}
                        variant="contained"
                    >
                        Sign In
                    </Button>
                }

                {error && (
                    <Typography>Login failed</Typography>
                )}

                <Typography variant="p" sx={{ color: 'text.primary' }}>
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