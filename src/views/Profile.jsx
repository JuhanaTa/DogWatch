import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
import ProfileImg from '../assets/DogSitterImage.png';
import Messages from '../components/Messages';
import BookingHistory from '../components/BookingHistory';
import Settings from '../components/Settings';

function ProfileOwner() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                {...other}
                sx={{p: 2}}
            >
                {value === 0 && <Messages></Messages>}
                {value === 1 && <BookingHistory></BookingHistory>}
                {value === 2 && <Settings></Settings>}   
            </Box>
        );
    }

    return (

        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
        }}>

            <Box sx={{
                backgroundColor: 'primary.main',
                height: '20vh',
                width: '100%'
            }}>
            </Box>

            <Box sx={{ padding: 10, position: 'relative' }}>

                <Box
                    sx={{
                        backgroundColor: 'secondary.main',
                        width: '90vw',
                        display: 'flex',
                        position: 'absolute',
                        top: '0%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2
                    }}>

                    <img src={ProfileImg} />

                    <Box>
                        <Typography variant='h4'>Meri Suomalainen</Typography>
                        <Typography variant='p'>Mother of Charlie</Typography>
                    </Box>

                </Box>

            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '90vw', paddingBottom: 2 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Messages" />
                    <Tab label="Booking History" />
                    <Tab label="Settings" />

                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                Messages
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Booking History
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Settings
            </CustomTabPanel>

        </Box>

    )
}

export default ProfileOwner