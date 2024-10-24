import cover from '../assets/backgroundMain.svg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container } from '@mui/material';

function MainPage() {

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'

        }}>

            <Box sx={{
                backgroundImage: `url(${cover})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "fill",
                height: 500,
                backgroundPosition: "center",
                display: 'block',
                width: '100%'
            }}>
            </Box>

            <Box sx={{ padding: 10, position: 'relative', minHeight: 500 }}>

                <Container
                    sx={{
                        backgroundColor: 'secondary.main',
                        height: 200,
                        width: '85vw',
                        display: 'block',
                        borderRadius: 10,
                        position: 'absolute',
                        top: '0%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}>

                    <h1>Search box</h1>

                </Container>

            </Box>

            <Box sx={{}}>

            </Box>

            <Box sx={{}}>

            </Box>

            <Box sx={{}}>

            </Box>

        </Box>
    )
}

export default MainPage