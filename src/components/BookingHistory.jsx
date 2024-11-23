import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, Modal, Tab, Tabs, Typography } from '@mui/material';
import BookingItem from './BookingItem';
import { useSelector } from 'react-redux';
import RequestBooking from './RequestBooking';
import ReviewSitter from './ReviewSitter';

function BookingHistory() {
    const { user } = useSelector((state) => state.user)
    const { bookings } = useSelector((state) => state.data)

    const processedBookings = bookings.filter(booking => booking.status === "completed" || booking.status === "confirmed")
    console.log('processed bookings', processedBookings)

    const oldbookings = [
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

            <Typography variant='h4'>Bookings</Typography>



            {processedBookings.length > 0 ?

                processedBookings.map((booking, index) => (
                    <BookingItem key={index} booking={booking} currentDate={currentDate}></BookingItem>
                ))
                :
                <Typography variant='p'>You have no active or completed bookings.</Typography>
            }
        </Box>

    )
}

export default BookingHistory