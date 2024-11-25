import { Box, Typography } from '@mui/material';
import BookingRequestItem from './BookingRequestItem';
import { useSelector } from 'react-redux';

function BookingRequests() {

    const { bookings } = useSelector((state) => state.data)
    const bookingReqs = bookings.filter(booking => booking.status === "pending" || booking.status === "denied")
    bookingReqs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (

        <Box sx={{
            width: '90vw',
            maxWidth: 1600,
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            gap: 2
        }}>

            <Typography variant='h4'>Booking Requests</Typography>

            {bookingReqs.length > 0 ?

                bookingReqs.map((booking, index) => (
                    <BookingRequestItem key={index} booking={booking}></BookingRequestItem>
                ))
                :
                <Typography variant='p'>Currently there are no new booking requests for you.</Typography>
            }


        </Box>

    )
}

export default BookingRequests