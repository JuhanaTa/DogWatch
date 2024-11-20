import cover from '../assets/landing_page.jpg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container, Typography } from '@mui/material';
import InfoCards from '../components/InfoCards';
import SearchBox from '../components/SearchBox';
import ReviewCarousel from '../components/ReviewCarousel';
import SearchResults from '../components/SearchResults';
import { useEffect } from 'react';

function MainPage() {

    useEffect(() => {
        console.log('Component re-rendered');
    });

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
        }}>

            <Box sx={{
                backgroundImage: `url(${cover})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: '65vh',
                backgroundPosition: "center",
                display: 'block',
                width: '100%'
            }}>
            </Box>



            <Box sx={{ pb: 22, position: 'relative' }}>
                <SearchBox></SearchBox>
            </Box>

            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 10
            }}>

                <Box>
                    <Typography variant="h4">
                        Why Choose Us
                    </Typography>
                    <InfoCards></InfoCards>
                </Box>

                <ReviewCarousel></ReviewCarousel>

                <Box>
                    <Typography variant="h4">
                        Our Dog Sitters
                    </Typography>

                    <SearchResults preview={true}></SearchResults>
                </Box>

            </Box>

        </Box>
    )
}

export default MainPage