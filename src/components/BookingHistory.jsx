import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
import BookingItem from './BookingItem';

function BookingHistory() {

    const bookings = [
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

    useEffect(() => {
        console.log('Component re-rendered');
      });
    return (

        <Box sx={{
            width: '90vw',
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            gap: 2
        }}>

            <Typography variant='h4'>Booking History</Typography>

            {bookings.map((booking, index) => (
                <BookingItem key={index} booking={booking} currentDate={currentDate}></BookingItem>
            ))}

        </Box>

    )
}

export default BookingHistory