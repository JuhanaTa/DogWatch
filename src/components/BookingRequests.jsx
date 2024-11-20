import { Box, Typography } from '@mui/material';
import BookingRequestItem from './BookingRequestItem';
import { useSelector } from 'react-redux';

function BookingRequests() {

    const { bookings } = useSelector((state) => state.data)

    const bookingRequests = [
        {
            serviceType: 'Dog sitting',
            startDate: 1731612988,
            endDate: 1731611988,
            createdDate: 1731602988,
            serviceProvider: 'Liam Nelsson'
        },
        {
            serviceType: 'Dog sitting',
            startDate: 1731612988,
            endDate: 1731611988,
            createdDate: 1731602988,
            serviceProvider: 'Liam Nelsson'
        },
        {
            serviceType: 'Dog sitting',
            startDate: 1731612988,
            endDate: 1731611988,
            createdDate: 1731602988,
            serviceProvider: 'Liam Nelsson'
        },
        {
            serviceType: 'Dog sitting',
            startDate: 1731612988,
            endDate: 1731611988,
            createdDate: 1731602988,
            serviceProvider: 'Liam Nelsson'
        },
    ]

    const currentDate = Math.floor(Date.now() / 1000);

    return (

        <Box sx={{
            width: '90vw',
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            gap: 2
        }}>

            <Typography variant='h4'>Booking Requests</Typography>

            {bookings.length > 0 ?

                bookings.map((booking, index) => (
                    <BookingRequestItem key={index} booking={booking} currentDate={currentDate}></BookingRequestItem>
                ))
                :
                <Typography variant='p'>Currently there are no bookings for you.</Typography>
            }


        </Box>

    )
}

export default BookingRequests