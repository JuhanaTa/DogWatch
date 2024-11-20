import { AccountCircle } from '@mui/icons-material';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField, InputAdornment, Rating, Typography, Container, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchSitters } from '../reducers/DataReducer';

function SearchBox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchParameters, availableLocations, services, searchLoading } = useSelector((state) => state.data)
    const [service, setService] = useState(searchParameters.service);
    const [location, setLocation] = useState(searchParameters.location)
    const [rating, setRating] = useState(searchParameters.rating);

    const handleService = (event) => {
        setService(event.target.value);
    };

    const handleLocation = (event) => {
        setLocation(event.target.value);
    }

    const handleRating = (event) => {
        console.log('rating', event.target.value)
        setRating(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();

        let filters = {
            service: service,
            location: location,
            rating: rating,
        }

        dispatch(searchSitters(filters)).then((result) => {
            if (result.payload) {
                //Finally go to search page when sitters fetched
                navigate(`/search`)
            }
        })

    }

    return (

        <Container
            sx={{
                backgroundColor: 'background.paper',
                width: '70vw',
                maxWidth: 700,
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

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>

                <FormControl sx={{ m: 1, width: 150 }}>

                    <InputLabel id="demo-simple-select-helper-label">Service</InputLabel>

                    <Select
                        labelId="service-label"
                        id="service-select"
                        value={service}
                        label="Service"
                        onChange={handleService}
                    >
                        {services.map((service, index) => (
                            <MenuItem key={index} value={service.name}>{service.name}</MenuItem>
                        ))}
                    </Select>

                </FormControl>

                <FormControl sx={{ m: 1, width: 175 }}>

                    <InputLabel id="demo-simple-select-helper-label">Location</InputLabel>

                    <Select
                        labelId="location-label"
                        id="location-select"
                        value={location}
                        label="Location"
                        onChange={handleLocation}
                        startAdornment={
                            <InputAdornment position="start">
                                <NearMeOutlinedIcon />
                            </InputAdornment>
                        }
                    >
                        {availableLocations.map((location, index) => (
                            <MenuItem key={index} value={location}>{location}</MenuItem>
                        ))}

                    </Select>

                </FormControl>

                <Box sx={{ m: 1, width: 150 }}>

                    <Typography>Rating</Typography>
                    <Rating
                        name="rating"
                        value={parseInt(rating)}
                        onChange={handleRating}
                    />

                </Box>

            </Box>

            {searchLoading ?
                <CircularProgress />
                :
                <Box>
                    <Button onClick={handleSearch} variant="contained">Search</Button>
                </Box>
            }


        </Container>

    )

}

export default SearchBox
