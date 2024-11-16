import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Card, CircularProgress, Container, Divider, FormControl, IconButton, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/sitter4.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userEdit } from '../reducers/UserReducer';
import ProfileImg from '../assets/sitter3.jpg';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { format } from 'date-fns';

function BookingItem({ currentDate, booking }) {
    const endDate = format(new Date(booking.startDate * 1000), 'MMMM dd, yyyy HH:mm')
    const startDate = format(new Date(booking.endDate * 1000), 'MMMM dd, yyyy HH:mm')
    const createdDate = format(new Date(booking.createdDate * 1000), 'MMMM dd, yyyy HH:mm')

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open);


    return (

        <Card
            sx={{
                width: '90vw',
                display: 'flex',
                flexDirection: 'column',

            }}
        >

            <Box
                sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2
                }}
            >

                <Box
                    sx={{
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'start'
                    }}
                >
                    <Typography variant='p' sx={{ fontWeight: 'bold' }}>{createdDate}</Typography>
                    <Typography variant='p'>{booking.serviceType}</Typography>
                </Box>

                <IconButton
                    onClick={handleOpen}
                    aria-label="open-booking"
                    size="large"
                >

                    {open ?
                        <ArrowUpward />
                        :
                        <ArrowDownward />
                    }
                </IconButton>

            </Box>

            {open &&
                <>

                    <Divider></Divider>

                    <Box
                        sx={{
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            p: 2,
                        }}
                    >

                        <Box
                            sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                alignItems: 'start',
                                flexWrap: 'wrap',
                                gap: 2
                            }}
                        >
                            <img style={{ width: 150, heigh: 150, borderRadius: '50%' }} src={ProfileImg} />

                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    display: 'flex',
                                    alignItems: 'start',
                                }}
                            >
                                <Typography variant='p' sx={{ fontWeight: 'bold' }}>{startDate} - {endDate}</Typography>
                                <Typography>Services: {booking.serviceType}</Typography>
                                <Typography variant='p'>By: {booking.serviceProvider}</Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Button sx={{ mr: 1 }} variant="contained">Contact</Button>
                            <Button
                                sx={{ ml: 1 }}
                                disabled={parseInt(currentDate) >= parseInt(booking.endDate) ? false : true}
                                variant="contained">
                                Review
                            </Button>
                        </Box>

                    </Box>
                </>
            }

        </Card>

    )
}

export default BookingItem