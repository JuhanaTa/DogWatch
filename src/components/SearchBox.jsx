import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchBox() {

    const [service, setService] = useState('');
    const [rating, setRating] = useState('');

    const handleService = (event) => {
        setService(event.target.value);
    };

    const handleRating = (event) => {
        setRating(event.target.value);
    };




    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
            <Box>

                <FormControl sx={{ m: 1, minWidth: 150 }}>

                    <InputLabel id="demo-simple-select-helper-label">Service</InputLabel>

                    <Select
                        labelId="service-label"
                        id="service-select"
                        value={service}
                        label="Service"
                        onChange={handleService}
                    >
                        <MenuItem value={1}>Dog sitting</MenuItem>
                        <MenuItem value={2}>Dog walking</MenuItem>
                    </Select>

                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 150 }}>

                    <InputLabel id="demo-simple-select-helper-label">Rating</InputLabel>

                    <Select
                        labelId="rating-label"
                        id="rating-select"
                        value={rating}
                        label="Rating"
                        onChange={handleRating}
                    >
                        <MenuItem value={1}>1 star</MenuItem>
                        <MenuItem value={2}>2 star</MenuItem>
                        <MenuItem value={3}>3 star</MenuItem>
                        <MenuItem value={4}>4 star</MenuItem>
                        <MenuItem value={5}>5 star</MenuItem>
                    </Select>

                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <TextField id="outlined-basic" label="Location" variant="outlined" />
                </FormControl>

            </Box>

            <Box>
                <Button LinkComponent={Link} to="/search" variant="contained">Search</Button>
            </Box>


        </Box>


    )

}

export default SearchBox
