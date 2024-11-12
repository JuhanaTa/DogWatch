import { AccountCircle } from '@mui/icons-material';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField, InputAdornment, Rating, Typography, Container } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
    const navigate = useNavigate();

    const [service, setService] = useState('');
    const [rating, setRating] = useState(0);

    const handleService = (event) => {
        setService(event.target.value);
    };

    const handleRating = (event) => {
        setRating(event.target.value);
    };




    return (

        <Container
            sx={{
                backgroundColor: 'background.paper',
                minWidth: '70vw',
                display: 'flex',
                flexDirection: 'column',
                p: 4,
                borderRadius: 10,
                position: 'absolute',
                top: '0%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
            }}>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                <FormControl sx={{ m: 1, width: 150 }}>

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

                <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NearMeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </FormControl>

                <Box sx={{ m: 1, width: 150 }}>

                    <Typography>Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />

                </Box>

            </Box>

            <Box>
                <Button onClick={()=>{navigate(`/search`)}} variant="contained">Search</Button>
            </Box>

        </Container>




    )

}

export default SearchBox
