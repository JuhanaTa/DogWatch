import { useState } from 'react'
import { Avatar, Box, Button, Card, CircularProgress, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImg from '../assets/sitter3.jpg';
import { format } from 'date-fns';
import { updateBookingStatus } from '../reducers/DataReducer';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';

function BookingRequestItem({ booking }) {
    const { user } = useSelector((state) => state.user)
    const { services, updateBookinStatusLoad } = useSelector((state) => state.data)
    const token = localStorage.getItem('token');

    const bookingService = services.find(serviceItem => booking.serviceId === serviceItem.uuid)
    console.log('booking', booking)

    //const endDate = format(new Date(booking.startDate * 1000), 'MMMM dd, yyyy HH:mm')
    //const startDate = format(new Date(booking.endDate * 1000), 'MMMM dd, yyyy HH:mm')

    const endDate = format(new Date(booking.endDate), "MMMM d, yyyy, HH:mm")
    const startDate = format(new Date(booking.startDate), "MMMM d, yyyy, HH:mm")
    const dispatch = useDispatch();


    console.log('booking', booking)

    const handleBookingStatusUpdate = (status) => {

        dispatch(updateBookingStatus({
            status: status,
            bookingId: booking.uuid,
            token: token
        }))

    }

    const handleMessagesOpen = () => {
        console.log('messages should open')
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
                        <Typography variant='p'>Services</Typography>
                        <Typography variant='p' sx={{ fontWeight: 'bold' }}>{bookingService.name}</Typography>
                        <Typography variant='p' sx={{ fontWeight: 'bold' }}>{startDate} - {endDate}</Typography>


                        {booking.ownerId === user.uuid ?
                            <Typography variant='p'>Requested by: You</Typography>
                            :
                            <Typography variant='p'>Requested by: {booking.owner.firstName} {booking.owner.lastName}</Typography>
                        }

                        {booking.sitterId === user.uuid ?
                            <Typography variant='p'>Sitter: You</Typography>
                            :
                            <Typography variant='p'>Sitter: {booking.sitter.firstName} {booking.sitter.lastName}</Typography>
                        }

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


                    <Box sx={{
                        display: 'flex',
                        height: '100%',
                        gap: 1

                    }}>

                        <IconButton
                            color="secondary"
                            sx={{
                                backgroundColor: "primary.main",
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                                height: '100%'
                            }}
                            aria-label="open messages"
                            onClick={handleMessagesOpen}
                        >
                            <ForumIcon />
                        </IconButton>


                        {user.role === "sitter" ?
                            <>
                                <Button
                                    sx={{ backgroundColor: 'notice' }}
                                    variant="contained"
                                    onClick={() => handleBookingStatusUpdate('denied')}
                                >
                                    Deny
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleBookingStatusUpdate('confirmed')}
                                >
                                    Accept
                                </Button>
                            </>
                            :
                            <Button
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