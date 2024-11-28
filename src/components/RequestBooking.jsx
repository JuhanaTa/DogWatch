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
import { DateTimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

function RequestBooking({ handleBookingForm, viewedProfile, setBookingOpen }) {
    const { user } = useSelector((state) => state.user)
    const { services, availableLocations } = useSelector((state) => state.data)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const [service, setService] = useState(services[0].name);
    const [location, setLocation] = useState(availableLocations[0]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [inputError, setInpuError] = useState(null);


    const handleService = (event) => {
        event.preventDefault();
        setService(event.target.value);
    };

    const handleLocation = (event) => {
        event.preventDefault();
        setLocation(event.target.value);
    };

    const handleBookingRequest = () => {

        const usedService = services.find(serviceItem => service === serviceItem.name)


        if (startTime && endTime) {

            const startToCompare = new Date(startTime).getTime()
            const endToCompare = new Date(endTime).getTime()

            if (startToCompare < endToCompare) {

                let bookingData = {
                    startDate: startTime.toISOString(),
                    endDate: endTime.toISOString(),
                    location: location,
                    serviceId: usedService.uuid,
                    sitterId: viewedProfile.uuid
                }

                console.log('booking data', bookingData)

                dispatch(createSitterBooking({
                    bookingData: bookingData,
                    token: token
                })).then(() => {
                    handleBookingForm() //TODO Is this correct?? Seems to work but might be wrong function
                })

            } else {
                setInpuError("Start time must be before end time.")
            }
        } else {
            setInpuError("Both times must be selected")
        }
    }

    // Handle date changes
    const handleStartTimeChange = (newValue) => {
        setStartTime(newValue);
        console.log("new start", new Date(newValue).getTime())
    };

    const handleEndTimeChange = (newValue) => {
        setEndTime(newValue);

        console.log("new end", new Date(newValue).getTime())

    };


    return (

        <Box sx={{ backgroundColor: 'secondary.main', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography variant="h6" sx={{ color: 'text.primary' }}>Request Booking</Typography>


            <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column', minWidth: 250 }}>
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>


                    <DateTimePicker
                        label="Start time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        viewRenderers={{
                            hours: null,
                            minutes: null,
                            seconds: null,
                        }}
                    />

                    <DateTimePicker
                        label="End time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        viewRenderers={{
                            hours: null,
                            minutes: null,
                            seconds: null,
                        }}
                    />

                </LocalizationProvider>

            </Box>

            {inputError &&
                <Typography variant='p' color='error'>{inputError}</Typography>
            }

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