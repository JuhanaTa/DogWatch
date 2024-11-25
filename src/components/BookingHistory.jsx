import { Box, Typography } from '@mui/material';
import BookingItem from './BookingItem';
import { useSelector } from 'react-redux';

function BookingHistory() {
    const { bookings } = useSelector((state) => state.data)

    const processedBookings = bookings.filter(booking => booking.status === "completed" || booking.status === "confirmed")
    processedBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

            <Typography variant='h4'>Bookings</Typography>

            {processedBookings.length > 0 ?

                processedBookings.map((booking, index) => (
                    <BookingItem key={index} booking={booking}></BookingItem>
                ))
                :
                <Typography variant='p'>You have no active or completed bookings.</Typography>
            }
        </Box>

    )
}

export default BookingHistory