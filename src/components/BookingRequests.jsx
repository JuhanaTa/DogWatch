import { Box, Typography } from '@mui/material';
import BookingRequestItem from './BookingRequestItem';
import { useSelector } from 'react-redux';

function BookingRequests() {

    const { bookings } = useSelector((state) => state.data)
    console.log('bookings!!!', bookings)
    const bookingReqs = bookings.filter(booking => booking.status === "pending" || booking.status === "denied")

    const currentDate = Math.floor(Date.now() / 1000);

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
                    <BookingRequestItem key={index} booking={booking} currentDate={currentDate}></BookingRequestItem>
                ))
                :
                <Typography variant='p'>Currently there are no new booking requests for you.</Typography>
            }


        </Box>

    )
}

export default BookingRequests