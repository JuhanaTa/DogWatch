import cover from '../assets/backgroundSearch.svg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchBox from '../components/SearchBox';
import { Box, Container, Typography } from '@mui/material';
import SearchResults from '../components/SearchResults';

function Search () {

    return(
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'
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
                    Found Dog Sitters
                </Typography>
            </Box>

            <SearchResults preview={false}></SearchResults>

        </Box>
    )
}

export default Search