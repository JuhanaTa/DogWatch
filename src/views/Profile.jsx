import { memo, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Tab, Tabs, Typography, Avatar } from '@mui/material';
import Messages from '../components/Messages';
import BookingHistory from '../components/BookingHistory';
import Settings from '../components/UserSettings';
import BookingRequests from '../components/BookingRequests';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;


function Profile() {
    const { user } = useSelector((state) => state.user)

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const CustomTabPanel = memo((props) => {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                {...other}
                sx={{
                    p: 2,
                    maxWidth: 1600,
                }}
            >
                {value === index && children}
            </Box>
        );

    })

    return (

        <Box
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
            }}
            onWheel={(e) => e.stopPropagation()}
        >

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
                        maxWidth: 1600,
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

                    <Avatar
                        sx={{
                            height: 150,
                            width: 150
                        }}
                        sizes='150'
                        alt="profile"
                        src={user.avatar ? VITE_IMAGE_URL + "/" + user.avatar : null}
                    >
                        <PersonIcon
                            sx={{
                                width: 60,
                                height: 60
                            }}>
                        </PersonIcon>
                    </Avatar>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography align='left' variant='h4'>{user.firstName} {user.lastName}</Typography>
                        <Typography align='left' variant='p'>{user.headline}</Typography>
                    </Box>

                </Box>

            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                borderBottom: 1,
                borderColor: 'divider',
                width: '90vw',
                maxWidth: 1600,
                paddingBottom: 2
            }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Booking Requests" />
                    <Tab label="Bookings" />
                    <Tab label="Messages" />
                    <Tab label="Account settings" />

                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <BookingRequests></BookingRequests>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <BookingHistory></BookingHistory>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Messages></Messages>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Settings></Settings>
            </CustomTabPanel>

        </Box>

    )
}

export default Profile