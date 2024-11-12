import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, FormControl, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/ProfilePhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import { userEdit } from '../reducers/UserReducer';

function UserSettings() {
    const { user, loading, error } = useSelector((state) => state.user)

    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [desc, setDesc] = useState(user.desc)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSettingsSave = () => {

        let newCredentials = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            desc: desc,
            email: email,
            password: user.password
        }

        dispatch(userEdit(newCredentials))
    }

    const handleFirstname = (event) => setFirstname(event.target.value);
    const handleLastname = (event) => setLastname(event.target.value);
    const handleUsername = (event) => setUsername(event.target.value);
    const handleEmail= (event) => setEmail(event.target.value);
    const handleDesc = (event) => setDesc(event.target.value);



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
                }}
            >

                <Box sx={{
                    border: '1px solid',
                    p: 4,
                    flexDirection: 'column',
                    display: 'flex',
                    maxWidth: 400
                }}>
                    <img src={ProfilePhoto} />
                    <Typography variant='p'>Image size should be under 1MB and image ration needs to be 1:1</Typography>
                </Box>


                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3
                }}>

                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <TextField
                            id="name-input"
                            label="First name"
                            variant="outlined"
                            value={firstname}
                            onChange={(e) => {handleFirstname(e)}}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <TextField
                            id="lastname-input"
                            label="Last name"
                            variant="outlined"
                            value={lastname}
                            onChange={(e) => {handleLastname(e)}}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <TextField
                            id="username-input"
                            label="Enter your username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => {handleUsername(e)}}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <TextField
                            id="email-input"
                            label="Email address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => {handleEmail(e)}}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <TextField
                            id="desc-input"
                            label="Your title or other description"
                            variant="outlined"
                            value={desc}
                            onChange={(e) => {handleDesc(e)}}
                        />
                    </FormControl>

                    <Button sx={{ width: 175, m: 1 }} onClick={() => { handleSettingsSave() }} variant="contained">Save Changes</Button>

                </Box>

            </Box>



        </Box>

    )
}

export default UserSettings