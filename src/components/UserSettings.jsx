import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Card, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userChangePassword, userEdit } from '../reducers/UserReducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function UserSettings() {
    const token = localStorage.getItem('token');
    const userUUID = localStorage.getItem('userUUID');

    const { user, userLoading, userError } = useSelector((state) => state.user)

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [description, setDescription] = useState(user.description)
    const [service, setService] = useState([
        false,
        false,
        false
    ]);
    const [avatar, setAvatar] = useState(user.avatar);
    const [inputImage, setInputImage] = useState(null);

    const [curPassword, setCurPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurPassword, setShowCurPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFirstName = (event) => setFirstName(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleDesc = (event) => setDescription(event.target.value);
    const handleCurPassword = (event) => setCurPassword(event.target.value);
    const handleNewPassword = (event) => setNewPassword(event.target.value);
    const handleConfirmPassword = (event) => setConfirmPassword(event.target.value);

    const handleClickshowCurPassword = () => setShowCurPassword(!showCurPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleDogWalking = (event) => {
        setService([!service[0], service[1], service[2]]);
    };

    const handleHouseSitting = (event) => {
        setService([service[0], !service[1], service[2]]);
    };

    const handleDaycare = (event) => {
        setService([service[0], service[1], !service[2]]);
    };

    const handleUserDataEdit = () => {

        let updatedData = {
            firstName: firstName,
            lastName: lastName,
            description: description,
            email: email,
        }

        dispatch(userEdit({
            uuid: userUUID,
            token: token,
            updatedData: updatedData,
            avatar: inputImage
        }))
    }

    const handlePasswordChange = () => {

        let passwords = {
            curPassword: curPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        }

        dispatch(userChangePassword({passwords: passwords, uuid: userUUID, token: token}))
    }

    console.log('file', inputImage)

    const handleImageChange = (event) => {
        console.log('img', event.target.files[0])
        if (event.target.files[0]) {
            setInputImage(event.target.files[0]);
        }
    }

    useEffect(() => {
        console.log('Component re-rendered');
    });

    return (

        <Box
            sx={{
                width: '90vw',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                alignItems: 'start'
            }}>

            <Typography variant='h4'>Account settings</Typography>


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >

                <Card sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    maxWidth: 400,
                    minWidth: 280,
                    position: 'relative',
                    flex: 1,
                    p: 2
                }}>
                    <label
                        htmlFor="image-upload"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 2,
                            cursor: 'pointer',
                        }}
                    >
                        <Input
                            id="image-upload"
                            type="file"
                            onChange={handleImageChange}
                            sx={{ display: 'none' }}
                        />
                    </label>
                    {userLoading ?
                        <CircularProgress />
                        :
                        <img src={"http://localhost:8080/api/v1/" + user.avatar} alt="Avatar" />

                    }
                    <Typography variant='p'>Image size should be under 1MB and image ration needs to be 1:1</Typography>


                </Card>


                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flex: 2,
                    minWidth: 300
                }}>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="name-input"
                            label="First name"
                            variant="outlined"
                            value={firstName}
                            onChange={(e) => { handleFirstName(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="lastname-input"
                            label="Last name"
                            variant="outlined"
                            value={lastName}
                            onChange={(e) => { handleLastName(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="email-input"
                            label="Email address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => { handleEmail(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="desc-input"
                            label="Your title or other description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => { handleDesc(e) }}
                        />
                    </FormControl>



                    {userLoading ?
                        <CircularProgress />
                        :
                        <Button sx={{ width: 150 }} onClick={() => { handleUserDataEdit() }} variant="contained">Save Changes</Button>
                    }

                    {userError && (
                        <Typography variant='p'>Changing settings failed</Typography>
                    )}

                </Box>

            </Box>



            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                flex: 1,
                width: '100%',
                maxWidth: 1000,
                flexWrap: 'wrap'
            }}>

                {user.role === 'sitter' &&
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            alignItems: 'start',
                            minWidth: 200
                        }}
                    >

                        <Typography variant='h6'>Services</Typography>

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={service[0]} onChange={handleDogWalking} name="Dog walking" />
                                }
                                label="Dog walking"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={service[1]} onChange={handleHouseSitting} name="Dog sitting" />
                                }
                                label="Dog sitting"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={service[2]} onChange={handleDaycare} name="Daycare" />
                                }
                                label="Daycare"
                            />
                        </FormGroup>

                        {userLoading ?
                            <CircularProgress />
                            :
                            <Button onClick={handleUserDataEdit} variant="contained">Save Services</Button>
                        }

                        {userError && (
                            <Typography variant='p'>Changing settings failed</Typography>
                        )}

                    </Box>
                }

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        flex: 1,
                        alignItems: 'start',
                        maxWidth: 500,
                        minWidth: 300
                    }}
                >

                    <Typography variant='h6'>Change password</Typography>

                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel>Current password</InputLabel>
                        <OutlinedInput
                            id="cur-pass-input"
                            variant="outlined"
                            type='password'
                            value={curPassword}
                            onChange={handleCurPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showCurPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickshowCurPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showCurPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Current password"
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel>New password</InputLabel>
                        <OutlinedInput
                            id="new-pass-input"
                            variant="outlined"
                            type='password'
                            value={newPassword}
                            onChange={handleNewPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showNewPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="New password"
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel>Confirm new password</InputLabel>
                        <OutlinedInput
                            id="confirm-pass-input"
                            variant="outlined"
                            type='password'
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showConfirmPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm new password"
                        />
                    </FormControl>

                    {userLoading ?
                        <CircularProgress />
                        :
                        <Button onClick={handlePasswordChange} variant="contained">Save Password</Button>
                    }

                    {userError && (
                        <Typography variant='p'>Changing settings failed</Typography>
                    )}
                </Box>


            </Box>



        </Box>

    )
}

export default UserSettings