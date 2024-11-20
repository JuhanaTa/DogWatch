import cover from '../assets/search_page.jpg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchBox from '../components/SearchBox';
import { Box, Container, Typography } from '@mui/material';
import SearchResults from '../components/SearchResults';

function Search() {

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'
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