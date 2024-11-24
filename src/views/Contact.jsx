import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Typography } from '@mui/material';
import ProfileImg from '../assets/sitter14.jpg';

function Contact() {

    const [count, setCount] = useState(0)


    return (
        <Box sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 400, gap: 4, flexWrap: 'wrap'
        }}>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                    maxWidth: 400,
                    gap: 1
                }}
            >
                <Typography align="left" variant='h3' fontWeight={'bold'}>Connect with us</Typography>
                <Typography align="left" variant='p' >Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team to inquire about our services, or just say hello.</Typography>
                <Typography align="left" variant='p' >Email: dogwatch@gmail.com</Typography>
            </Box>

            <Box
                sx={{
                    backgroundImage: `url(${ProfileImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    maxHeight: 300,
                    maxWidth: 300,
                    height: 300,
                    borderRadius: '50%',
                    backgroundPosition: "center",
                    display: 'block',
                    width: '100%'
                }}
            >

            </Box>

        </Box>
    )
}

export default Contact