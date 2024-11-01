import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';

function BookingHistory() {

    return (

        <Box sx={{ width: '90vw', height: 600, flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>

            <Typography variant='h3'>Booking History</Typography>

        </Box>

    )
}

export default BookingHistory