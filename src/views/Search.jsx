import cover from '../assets/search_page.jpg'
import SearchBox from '../components/SearchBox';
import { Box, Typography } from '@mui/material';
import SearchResults from '../components/SearchResults';

function Search() {

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', pb: 5
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