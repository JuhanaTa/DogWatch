import { useState } from 'react'
import { Box, Button, Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProfileImg from '../assets/sitter3.jpg';
import { format } from 'date-fns';

function BookingRequestItem({ currentDate, booking }) {
    const { user } = useSelector((state) => state.user)
    const { services } = useSelector((state) => state.data)

    const bookingService = services.find(serviceItem => booking.serviceId === serviceItem.uuid)

    //const endDate = format(new Date(booking.startDate * 1000), 'MMMM dd, yyyy HH:mm')
    //const startDate = format(new Date(booking.endDate * 1000), 'MMMM dd, yyyy HH:mm')

    const endDate = format(new Date(booking.endDate), "MMMM d, yyyy")
    const startDate = format(new Date(booking.startDate), "MMMM d, yyyy")

    console.log('booking', booking)

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
                        <Typography>Service: {bookingService.name}</Typography>
                        <Typography variant='p'>By: {booking.ownerId}</Typography>
                    </Box>
                </Box>

                <Box>
                    {user.role === "sitter" ?
                        <>
                            <Button sx={{ mr: 1 }} variant="contained">Deny</Button>
                            <Button
                                sx={{ ml: 1 }}
                                disabled={parseInt(currentDate) >= parseInt(booking.endDate) ? false : true}
                                variant="contained">
                                Accept
                            </Button>
                        </>
                        :
                        <Button sx={{ mr: 1 }} variant="contained">Cancel Request</Button>
                    }
                </Box>

            </Box>

        </Card>

    )
}

export default BookingRequestItem