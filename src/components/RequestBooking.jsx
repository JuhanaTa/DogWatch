import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import SendIcon from '@mui/icons-material/Send';

function RequestBooking({handleBookingForm}) {
    const navigate = useNavigate();

    const [service, setService] = useState(1);
    const [location, setLocation] = useState(1);
    const [description, setDescription] = useState('');


    const handleService = (event) => {
        event.preventDefault();
        setService(event.target.value);
    };

    const handleLocation = (event) => {
        event.preventDefault();
        setLocation(event.target.value);
    };

    const handleDescription = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    return (

        <Box sx={{ backgroundColor: 'secondary.main', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography variant="h6" sx={{ color: 'text.primary' }}>Request Booking</Typography>

            <Divider></Divider>

            <Box>
                <FormControl sx={{ mb: 4, width: '100%' }}>
                    <InputLabel id="service-select-label">Service</InputLabel>
                    <Select
                        labelId="service-label"
                        id="service-select"
                        value={service}
                        label="Select Service"
                        onChange={handleService}
                    >
                        <MenuItem value={1}>Dog sitting</MenuItem>
                        <MenuItem value={2}>Dog walking</MenuItem>
                    </Select>

                </FormControl>

                <FormControl sx={{ mb: 4, width: '100%' }}>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                        labelId="location-label"
                        id="location-select"
                        value={location}
                        label="Where do you live..."
                        onChange={handleLocation}
                    >
                        <MenuItem value={1}>Location 1</MenuItem>
                        <MenuItem value={2}>Location 2</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '100%' }}>
                    <TextField
                        id="desc-input"
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={handleDescription}
                    />
                </FormControl>

                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{
                        calendarWeekNumberHeaderText: '#',
                        calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
                    }}
                >
                    <DateCalendar displayWeekNumber />
                </LocalizationProvider>



            </Box>

            <Button
                onClick={(e) => {
                    handleBookingForm(e)
                }}
                variant="contained"
                endIcon={<SendIcon />}
            >
                Send Request
            </Button>

        </Box>

    )
}

export default RequestBooking