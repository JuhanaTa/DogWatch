import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
import ProfileImg from '../assets/sitter3.jpg';
import Messages from '../components/Messages';
import BookingHistory from '../components/BookingHistory';
import Settings from '../components/UserSettings';
import BookingRequests from '../components/BookingRequests';

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
                sx={{ p: 2 }}
            >
                {value === 0 && <BookingRequests></BookingRequests>}
                {value === 1 && <Messages></Messages>}
                {value === 2 && <BookingHistory></BookingHistory>}
                {value === 3 && <Settings></Settings>}
            </Box>
        );

    }

    return (

        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
        }}>

            <Box sx={{
                backgroundColor: 'primary.main',
                height: 200,
                width: '100%'
            }}>
            </Box>

            <Box sx={{ p: 6, position: 'relative' }}>

                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        width: '90vw',
                        height: 200,
                        display: 'flex',
                        position: 'absolute',
                        top: '0%',
                        left: '50%',
                        transform: 'translate(-50%, -65%)',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        p: 2,
                        gap: 2
                    }}>

                    <img style={{ width: 200, borderRadius: '50%' }} src={ProfileImg} />

                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography align='left' variant='h4'>Meri Suomalainen</Typography>
                        <Typography align='left' variant='p'>Mother of Charlie</Typography>
                    </Box>

                </Box>

            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                borderBottom: 1,
                borderColor: 'divider',
                width: '90vw',
                paddingBottom: 2
            }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Booking Requests" />
                    <Tab label="Messages" />
                    <Tab label="Booking History" />
                    <Tab label="Account settings" />

                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                Booking Requests
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Messages
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Booking History
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Account settings
            </CustomTabPanel>

        </Box>

    )
}

export default ProfileOwner