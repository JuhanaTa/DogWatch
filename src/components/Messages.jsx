import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Typography } from '@mui/material';

function Messages() {

    return (

        <Box sx={{
            width: '90vw',
            maxWidth: 1600,
            height: 700,
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'start',
            gap: 2
        }}>

            <Typography variant='h4'>Messages under construction</Typography>

            <Box sx={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: 2
            }}>

                <Box sx={{ width: '24vw', height: 600, border: '1px solid' }}>

                </Box>

                <Box sx={{ width: '64vw', height: 600, border: '1px solid' }}>

                </Box>
            </Box>
        </Box>

    )
}

export default Messages