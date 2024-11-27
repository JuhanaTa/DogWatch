import { AccountCircle } from '@mui/icons-material';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField, InputAdornment, Rating, Typography, Container, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilteredSitters } from '../reducers/DataReducer';

function SearchBox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchParameters, availableLocations, services, filterLoad } = useSelector((state) => state.data)
    console.log('search params', searchParameters)
    const [service, setService] = useState(searchParameters.service.name);
    const [location, setLocation] = useState(searchParameters.location)
    const [rating, setRating] = useState(searchParameters.rating)

    console.log('service and services', searchParameters.service, services)

    const handleService = (event) => {
        console.log('selected service',event.target.value)
        setService(event.target.value);
    };

    const handleLocation = (event) => {
        setLocation(event.target.value);
    }

    const handleRating = (event) => {
        console.log('rating', event.target.value)
        setRating(parseInt(event.target.value));
    };

    const handleSearch = (event) => {
        event.preventDefault();

        //need to find the service id
        const usedService = services.find(serItem => serItem.name === service)

        console.log('used service', usedService)

        let filters = {
            service: usedService,
            location: location,
            rating: rating,
        }

        dispatch(searchFilteredSitters(filters)).then((result) => {
            if (result.payload) {
                //Finally go to search page when sitters fetched
                console.log('should navigate to search')
                navigate(`/DogWatch/search`)
            }
        })

    }

    useEffect(() => {
        console.log('Search component mounted');
    }, []);

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
                        {services.map((item, index) => (
                            <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
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

            {filterLoad ?
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
