import { useState } from 'react'
import { Avatar, Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImg from '../assets/sitter3.jpg';
import { format } from 'date-fns';
import { updateBookingStatus } from '../reducers/DataReducer';
import PersonIcon from '@mui/icons-material/Person';

function BookingRequestItem({ currentDate, booking }) {
    const { user } = useSelector((state) => state.user)
    const { services, updateBookinStatusLoad } = useSelector((state) => state.data)
    const token = localStorage.getItem('token');

    const bookingService = services.find(serviceItem => booking.serviceId === serviceItem.uuid)
    console.log('booking', booking)

    //const endDate = format(new Date(booking.startDate * 1000), 'MMMM dd, yyyy HH:mm')
    //const startDate = format(new Date(booking.endDate * 1000), 'MMMM dd, yyyy HH:mm')

    const endDate = format(new Date(booking.endDate), "MMMM d, yyyy")
    const startDate = format(new Date(booking.startDate), "MMMM d, yyyy")
    const dispatch = useDispatch();


    console.log('booking', booking)

    const handleBookingStatusUpdate = (status) => {

        dispatch(updateBookingStatus({
            status: status,
            bookingId: booking.uuid,
            token: token
        }))

    }

    return (

        <Card
            sx={{
                width: '100%',
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

                    <Avatar
                        sx={{
                            height: 120,
                            width: 120
                        }}
                        alt="ReviewAvatar"
                        src={"http://localhost:8080/" + booking.owner.avatar}
                    >
                        <PersonIcon
                            sx={{
                                width: 60,
                                height: 60
                            }}>
                        </PersonIcon>
                    </Avatar>

                    <Box
                        sx={{
                            flexDirection: 'column',
                            display: 'flex',
                            alignItems: 'start',
                        }}
                    >
                        <Typography variant='p' sx={{ fontWeight: 'bold' }}>{startDate} - {endDate}</Typography>
                        <Typography>Service: {bookingService.name}</Typography>
                        <Typography variant='p'>By: {booking.owner.firstName} {booking.owner.lastName}</Typography>

                        {booking.status === "pending" ?
                            <Typography variant='p' color='notice'>Status: {booking.status}</Typography>
                            :
                            <Typography variant='p' color='error'>Status: {booking.status}</Typography>
                        }

                    </Box>
                </Box>


                {updateBookinStatusLoad ?

                    <CircularProgress></CircularProgress>
                    :
                    <Box>
                        {user.role === "sitter" ?
                            <>
                                <Button
                                    sx={{ mr: 1 }}
                                    color='error'
                                    variant="contained"
                                    onClick={() => handleBookingStatusUpdate('denied')}
                                >
                                    Deny
                                </Button>
                                <Button
                                    sx={{ ml: 1 }}
                                    disabled={parseInt(currentDate) >= parseInt(booking.endDate) ? false : true}
                                    variant="contained"
                                    onClick={() => handleBookingStatusUpdate('confirmed')}
                                >
                                    Accept
                                </Button>
                            </>
                            :
                            <Button
                                sx={{ mr: 1 }}
                                variant="contained"
                                onClick={() => handleBookingStatusUpdate('cancelled')}
                            >Cancel Request</Button>
                        }
                    </Box>
                }

            </Box>

        </Card>

    )
}

export default BookingRequestItem