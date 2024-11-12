import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm({setShowRegister}) {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPass = () => setShowConfirmPass((show) => !show);

  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

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

                <Typography variant="h4" sx={{ color: 'text.primary', p: 1 }}>Create your account</Typography>

                <FormControl sx={{ m: 1, width: '25ch' }}>
                    <TextField id="user-input" label="First name" variant="outlined" />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }}>
                    <TextField id="password-input" label="Last name" variant="outlined" />
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
                    />
                </FormControl>


                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmPass ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showConfirmPass ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowConfirmPass}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                </FormControl>

                <Typography variant="p" sx={{ color: 'text.primary', p: 1 }}>Choose your role:</Typography>

                <Button sx={{ width: 175, m: 1  }} onClick={()=>{navigate(`/`)}} variant="contained">Create Account</Button>

                <Typography variant="p" sx={{ color: 'text.primary', p: 1 }}>
                    Have you already created an account?{" "}
                    <Link onClick={() => setShowRegister(false)} color="inherit">
                        Sign in instead!
                    </Link>
                </Typography>

            </Box>

        </Box>

    )
}

export default RegisterForm