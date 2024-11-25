import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Box, Button, Card, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserServices, userChangePassword, userEdit } from '../reducers/UserReducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';

function UserSettings() {
    const token = localStorage.getItem('token');
    const userUUID = localStorage.getItem('userUUID');

    const { user, userPasswordChangeLoad, userEditLoad, userEditError, userPasswordChangeError, userServicesUpdateLoad, userServicesUpdateError } = useSelector((state) => state.user)
    const { services } = useSelector((state) => state.data)

    console.log('user Settings user', user)

    const [firstName, setFirstName] = useState(user.firstName != null ? user.firstName : "")
    const [lastName, setLastName] = useState(user.lastName != null ? user.lastName : "")
    const [headline, setHeadline] = useState(user.headline != null ? user.headline : "")
    const [description, setDescription] = useState(user.description != null ? user.description : "")
    const userServiceUUIDs = user.services.map((service) => service.uuid);
    const [selectedServices, setSelectedServices] = useState(userServiceUUIDs);
    const [errors, setErrors] = useState({});

    const [curPassword, setCurPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurPassword, setShowCurPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState({});


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFirstName = (event) => setFirstName(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);
    const handleHeadline = (event) => setHeadline(event.target.value);
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

    const handleUserServices = (serviceId) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(serviceId)
                ? prevSelected.filter((uuid) => uuid !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    const handleUserDataEdit = () => {
        if (validate()) {
            let updatedData = {
                firstName: firstName,
                lastName: lastName,
                description: description,
                headline: headline,
            }

            dispatch(userEdit({
                uuid: userUUID,
                token: token,
                updatedData: updatedData
            }))
        }
    }

    const handleImageUpdate = (image) => {
        console.log('image to send', image)
        dispatch(userEdit({
            uuid: userUUID,
            token: token,
            updatedData: {},
            avatar: image
        }))
    }

    const handleUserServicesSave = () => {
        dispatch(updateUserServices({
            services: selectedServices,
            id: userUUID,
            token: token
        }))
    }

    const handlePasswordChange = () => {

        if (validatePasswords()) {
            let passwords = {
                currentPassword: curPassword,
                newPassword: newPassword,
            }

            dispatch(userChangePassword({ passwords: passwords, uuid: userUUID, token: token }))
        }

    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        handleImageUpdate(file)
    }


    const validate = () => {
        const allErrors = {};

        if (!firstName.trim()) {
            allErrors.firstName = 'Firstname is required';
        } else if (firstName.length < 3 || firstName.length > 100) {
            allErrors.firstName = 'Firstname must be between 3 to 100 characters';
        }

        if (!lastName.trim()) {
            allErrors.lastName = 'Lastname is required';
        } else if (lastName.length < 3 || lastName.length > 100) {
            allErrors.lastName = 'Lastname must be between 3 to 100 characters';
        }

        if (!headline.trim()) {
            allErrors.headline = 'Headline is required';
        } else if (headline.length < 4 || headline.length > 150) {
            allErrors.headline = 'Headline must be between 4 to 150 characters';
        }

        if (!description.trim()) {
            allErrors.description = 'Description is required';
        } else if (description.length < 4 || description.length > 1000) {
            allErrors.description = 'Description must be between 4 to 1000 characters';
        }

        setErrors(allErrors)

        return Object.keys(allErrors).length === 0;
    }

    const validatePasswords = () => {
        const allPasswordErrors = {};

        if (!curPassword.trim()) {
            allPasswordErrors.curPassword = 'Password is required';
        } else if (curPassword.length < 8) {
            allPasswordErrors.curPassword = 'Password must be at least 8 characters.';
        }

        if (!newPassword.trim()) {
            allPasswordErrors.newPassword = 'Password is required';
        } else if (newPassword.length < 8) {
            allPasswordErrors.newPassword = 'Password must be at least 8 characters.';
        }

        if (!confirmPassword.trim()) {
            allPasswordErrors.confirmPassword = 'Confirm password is required';
        } else if (confirmPassword !== newPassword) {
            allPasswordErrors.confirmPassword = 'Confirm password must match with new password.';
        }

        setPasswordErrors(allPasswordErrors)

        return Object.keys(allPasswordErrors).length === 0;
    }

    return (

        <Box
            sx={{
                width: '90vw',
                maxWidth: 1600,
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
                            name='avatar'
                            onChange={handleImageChange}
                            value={""}
                            sx={{ display: 'none' }}
                        />
                    </label>

                    <Avatar
                        sx={{
                            height: 280,
                            width: 280
                        }}
                        variant='square'
                        alt="Remy Sharp"
                        src={"http://localhost:8080/" + user.avatar}
                    >
                        <PersonIcon
                            sx={{
                                width: 120,
                                height: 120
                            }}>
                        </PersonIcon>
                    </Avatar>


                    <Typography variant='p'>Images are transformed to 1:1 format.</Typography>


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
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="lastname-input"
                            label="Last name"
                            variant="outlined"
                            value={lastName}
                            onChange={(e) => { handleLastName(e) }}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="headline-input"
                            label="Headline"
                            variant="outlined"
                            value={headline}
                            onChange={(e) => { handleHeadline(e) }}
                            error={!!errors.headline}
                            helperText={errors.headline}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="desc-input"
                            label="Your title or other description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => { handleDesc(e) }}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </FormControl>



                    {userEditLoad ?
                        <CircularProgress />
                        :
                        <Button sx={{ width: 150 }} onClick={() => { handleUserDataEdit() }} variant="contained">Save Changes</Button>
                    }

                    {userEditError && (
                        <Typography align='left' variant='p' color='error'>Changing user info failed.</Typography>
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
                            {services.map((serviceItem, index) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox

                                            checked={selectedServices.includes(serviceItem.uuid)}
                                            onChange={() => handleUserServices(serviceItem.uuid)}
                                            name={serviceItem.name}



                                        />
                                    }
                                    label={serviceItem.name}
                                    key={index}
                                />
                            ))}
                        </FormGroup>

                        {userServicesUpdateLoad ?
                            <CircularProgress />
                            :
                            <Button onClick={handleUserServicesSave} variant="contained">Save Services</Button>
                        }

                        {userServicesUpdateError && (
                            <Typography variant='p'>Changing services failed</Typography>
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
                        <TextField
                            id="cur-pass-input"
                            variant="outlined"
                            type={showCurPassword ? 'text' : 'password'}
                            value={curPassword}
                            onChange={handleCurPassword}

                            slotProps={{
                                input: {
                                    endAdornment: (
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
                                    ),
                                },
                            }}

                            /*endAdornment={
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
                            }*/
                            error={!!passwordErrors.curPassword}
                            helperText={passwordErrors.curPassword}
                            label="Current password"
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="new-pass-input"
                            variant="outlined"
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPassword}

                            slotProps={{
                                input: {
                                    endAdornment: (
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
                                    ),
                                },
                            }}

                            /*endAdornment={
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
                            }*/
                            error={!!passwordErrors.newPassword}
                            helperText={passwordErrors.newPassword}
                            label="New password"
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="confirm-pass-input"
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPassword}

                            slotProps={{
                                input: {
                                    endAdornment: (
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
                                    ),
                                },
                            }}

                            /*endAdornment={
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
                            }*/
                            error={!!passwordErrors.confirmPassword}
                            helperText={passwordErrors.confirmPassword}
                            label="Confirm new password"
                        />
                    </FormControl>

                    {userPasswordChangeLoad ?
                        <CircularProgress />
                        :
                        <Button onClick={handlePasswordChange} variant="contained">Save Password</Button>
                    }

                    {userPasswordChangeError && (
                        <Typography variant='p'>Changing settings failed</Typography>
                    )}
                </Box>


            </Box>



        </Box>

    )
}

export default UserSettings


/*
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
*/