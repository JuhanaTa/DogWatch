import cover from '../assets/backgroundMain.svg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container, Typography } from '@mui/material';
import InfoCards from '../components/InfoCards';
import SearchBox from '../components/SearchBox';

function MainPage() {

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
        }}>

            <Box sx={{
                backgroundImage: `url(${cover})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: '65vh',
                backgroundPosition: "top",
                display: 'block',
                width: '100%'
            }}>
            </Box>

            <Box sx={{ padding: 10, position: 'relative' }}>

                <Container
                    sx={{
                        backgroundColor: 'secondary.main',
                        minWidth: '70vw',
                        display: 'block',
                        borderRadius: 10,
                        position: 'absolute',
                        top: '0%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}>

                    <SearchBox></SearchBox>

                </Container>

            </Box>

            <Box>
                <Typography variant="h3" gutterBottom sx={{ color: 'text.primary' }}>
                    Why Choose Us
                </Typography>
            </Box>

            <InfoCards></InfoCards>

        </Box>
    )
}

export default MainPage