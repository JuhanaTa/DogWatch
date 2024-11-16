import { Box, Typography } from '@mui/material';
import BookingRequestItem from './BookingRequestItem';

function BookingRequests() {

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

            {bookingRequests.map((booking, index) => (
                <BookingRequestItem key={index} booking={booking} currentDate={currentDate}></BookingRequestItem>
            ))}

        </Box>

    )
}

export default BookingRequests