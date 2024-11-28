import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, Checkbox, CircularProgress, MenuItem, Select, FormHelperText } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../reducers/UserReducer';
import { NearMeOutlined } from '@mui/icons-material';
import { SocketContext } from '../App';
const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

function RegisterForm({ setShowRegister }) {
    const navigate = useNavigate();
    const { userRegisterLoad, userRegisterError } = useSelector((state) => state.user)
    const { availableLocations } = useSelector((state) => state.data)
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [roleChecked, setRoleChecked] = useState([false, true]);
    const [location, setLocation] = useState(availableLocations[0])
    const [errors, setErrors] = useState({});

    const socket = useContext(SocketContext);



    const handleFirstname = (event) => setFirstname(event.target.value);
    const handleLastname = (event) => setLastname(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleLocation = (event) => setLocation(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleRePassword = (event) => setRePassword(event.target.value);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPass = () => setShowConfirmPass((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeSitter = (event) => {
        setRoleChecked([!roleChecked[0], !roleChecked[0] ? false : roleChecked[1]]);
    };

    const handleChangeOwner = (event) => {
        setRoleChecked([!roleChecked[1] ? false : roleChecked[0], !roleChecked[1]]);
    };

    const handleRegister = (event) => {
        event.preventDefault();

        if (validate()) {
            let credentials = {
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password,
                role: roleChecked[0] ? 'sitter' : 'owner',
                location: location
            }

            console.log('creds', credentials)
            dispatch(userRegister(credentials)).then((result) => {
                if (result.payload) {

                    //Before new user can use socket disconnect the previous
                    socket.disconnect()

                    console.log('Before connecting to socket', result.payload)

                    socket.connect(VITE_SOCKET_URL,
                        {
                            query: { userId: result.payload.userInfo.uuid }
                        }
                    );

                    navigate(`/`)
                }
            })
        }
    }


    const validate = () => {
        const allErrors = {};

        if (!firstname.trim()) {
            allErrors.firstname = 'Firstname is required';
        } else if (firstname.length < 3 || firstname.length > 100) {
            allErrors.firstname = 'Firstname must be between 3 to 100 characters';
        }

        if (!lastname.trim()) {
            allErrors.lastname = 'Lastname is required';
        } else if (lastname.length < 3 || lastname.length > 100) {
            allErrors.lastname = 'Lastname must be between 3 to 100 characters';
        }

        if (!email.trim()) {
            allErrors.email = 'Email is required';
        }

        if (!password.trim()) {
            allErrors.password = 'Password is required';
        } else if (password.length < 8) {
            allErrors.password = 'Password must be at least 8 characters.';
        }

        if (!rePassword.trim()) {
            allErrors.rePassword = 'Confirm password is required';
        } else if (rePassword !== password) {
            allErrors.rePassword = 'Passwords must match';
        }

        setErrors(allErrors)

        return Object.keys(allErrors).length === 0;
    }

    return (

        <Box sx={{ width: '100%', height: '80vh', position: 'relative' }}>

            <Box sx={{
                minWidth: 200,
                maxWidth: 1000,
                backgroundColor: 'background.paper',
                position: 'absolute',
                top: '55%',
                left: '15%',
                transform: 'translate(-15%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                p: 4
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2
                }}>
                    <Typography variant="h4" sx={{ color: 'text.primary', p: 1 }}>Create your account</Typography>

                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ flex: 1, mr: 1 }}>
                            <TextField
                                id="name-input"
                                label="First name"
                                variant="outlined"
                                value={firstname}
                                onChange={handleFirstname}
                                error={!!errors.firstname}
                                helperText={errors.firstname}
                            />
                        </FormControl>

                        <FormControl sx={{ flex: 1, ml: 1 }}>
                            <TextField
                                id="lastname-input"
                                label="Last name"
                                variant="outlined"
                                value={lastname}
                                onChange={handleLastname}
                                error={!!errors.lastname}
                                helperText={errors.lastname}
                            />
                        </FormControl>
                    </Box>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            type='email'
                            id="email-input"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmail}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>

                        <InputLabel id="location-label">Location</InputLabel>

                        <Select
                            labelId="location-select-label"
                            id="location-select"
                            value={location}
                            label="Location"
                            sx={{
                                '.MuiSelect-select': {
                                    textAlign: 'right'
                                },
                            }}
                            onChange={handleLocation}
                            startAdornment={
                                <InputAdornment position="start">
                                    <NearMeOutlined />
                                </InputAdornment>
                            }
                        >
                            {availableLocations.map((location, index) => (
                                <MenuItem key={index} value={location}>{location}</MenuItem>
                            ))}

                        </Select>

                    </FormControl>


                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ flex: 1, mr: 1 }} variant="outlined">
                            <TextField
                                id="outlined-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePassword}



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
                            />
                        </FormControl>


                        <FormControl sx={{ flex: 1, ml: 1 }} variant="outlined">
                            <TextField
                                id="outlined-reenter-password"
                                type={showConfirmPass ? 'text' : 'password'}
                                value={rePassword}
                                onChange={handleRePassword}


                                slotProps={{
                                    input: {
                                        endAdornment: (
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
                                        ),
                                    },
                                }}

                                error={!!errors.rePassword}
                                helperText={errors.rePassword}
                                label="Confirm Password"
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '100%', display: 'flex', gap: 2, flexWrap: 'wrap' }}>

                        <Typography variant="p" sx={{ color: 'text.primary', p: 1 }}>Choose your role:</Typography>

                        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                                label="Dog sitter"
                                control={<Checkbox checked={roleChecked[0]} onChange={handleChangeSitter} />}
                            />
                            <FormControlLabel
                                label="Dog owner"
                                control={<Checkbox checked={roleChecked[1]} onChange={handleChangeOwner} />}
                            />
                        </FormGroup>

                    </Box>


                    {userRegisterLoad ?
                        <CircularProgress />
                        :
                        <Button onClick={handleRegister} variant="contained">Create Account</Button>
                    }

                    {userRegisterError && (
                        <Typography variant='p' color='error'>Register failed: {userRegisterError}</Typography>
                    )}

                    <Typography variant="p" sx={{ color: 'text.primary' }}>
                        Have you already created an account?{" "}
                        <Link onClick={() => setShowRegister(false)} color="inherit">
                            Sign in instead!
                        </Link>
                    </Typography>
                </Box>
            </Box>

        </Box>

    )
}

export default RegisterForm