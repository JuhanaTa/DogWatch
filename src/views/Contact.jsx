import { Box, Typography } from '@mui/material';
import ProfileImg from '../assets/sitter14.jpg';

function Contact() {

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 400, gap: 4, flexWrap: 'wrap'
        }}>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                    maxWidth: 350,
                    gap: 1
                }}
            >
                <Typography align="left" variant='h3' fontWeight={'bold'}>Connect with us</Typography>
                <Typography align="left" variant='p' >Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team to inquire about our services, or just say hello.</Typography>
                <Typography align="left" variant='p' >Phone: +358 123 456 78</Typography>
                <Typography align="left" variant='p' >Email: dogwatch@gmail.com</Typography>
            </Box>

            <Box
                sx={{
                    backgroundImage: `url(${ProfileImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    maxHeight: 250,
                    maxWidth: 250,
                    height: 250,
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