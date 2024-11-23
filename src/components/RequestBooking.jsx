import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { createSitterBooking } from '../reducers/DataReducer';

function RequestBooking({ handleBookingForm, viewedProfile, setBookingOpen }) {
    const { user } = useSelector((state) => state.user)
    const { services, availableLocations } = useSelector((state) => state.data)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const [service, setService] = useState(services[0].name);
    const [location, setLocation] = useState(availableLocations[0]);
    const [description, setDescription] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);

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

    const handleDateChange = (date) => {
        console.log('date', date.toISOString());
        const dateString = date.toISOString();
    
        setSelectedDates((prevDates) => {
            const updatedDates = prevDates.includes(dateString)
                ? prevDates.filter((d) => d !== dateString) // Deselect if already selected
                : [...prevDates, dateString]; // Add to selected dates
    
            // Sort dates from earliest to latest
            return updatedDates.sort((a, b) => new Date(a) - new Date(b));
        });
    };
    console.log('selections', selectedDates, service, location)

    const isSelected = (date) => selectedDates.includes(date.toISOString());

    const handleBookingRequest = () => {

        const usedService = services.find(serviceItem => service === serviceItem.name)

        if(selectedDates.length > 0) {
            let bookingData = {
                startDate: selectedDates[0],
                endDate: selectedDates[selectedDates.length - 1],
                location: location,
                serviceId: usedService.uuid,
                sitterId: viewedProfile.uuid
            }

            console.log('booking data', bookingData)
    
            dispatch(createSitterBooking({
                bookingData: bookingData,
                token: token
            }))
        }
    }

    return (

        <Box sx={{ backgroundColor: 'secondary.main', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography variant="h6" sx={{ color: 'text.primary' }}>Request Booking</Typography>


            <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="service-select-label">Service</InputLabel>
                    <Select
                        labelId="service-label"
                        id="service-select"
                        value={service}
                        label="Select Service"
                        onChange={handleService}
                    >
                        {services.map((service, index) => (
                            <MenuItem key={index} value={service.name}>{service.name}</MenuItem>
                        ))}
                    </Select>

                </FormControl>

                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                        labelId="location-label"
                        id="location-select"
                        value={location}
                        label="Where do you live..."
                        onChange={handleLocation}
                    >

                        {availableLocations.map((location, index) => (
                            <MenuItem key={index} value={location}>{location}</MenuItem>
                        ))}

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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        onChange={handleDateChange}
                        renderDay={(day, selectedDay, pickersDayProps) => {
                            const isSelectedDay = isSelected(day);

                            return (
                                <div
                                    {...pickersDayProps}
                                    style={{
                                        ...pickersDayProps.style,
                                        backgroundColor: isSelectedDay ? '#1976d2' : undefined, // Highlight selected days
                                        color: isSelectedDay ? '#fff' : undefined, // White text
                                        borderRadius: '50%', // Circular shape
                                        cursor: 'pointer', // Hand cursor on hover
                                    }}
                                >
                                    {day.date()}
                                </div>
                            );
                        }}
                    />
                </LocalizationProvider>

            </Box>

            <Button
                onClick={handleBookingRequest}
                variant="contained"
                endIcon={<SendIcon />}
            >
                Send Request
            </Button>

        </Box>

    )
}

export default RequestBooking