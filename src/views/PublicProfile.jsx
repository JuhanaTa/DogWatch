import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Tab, Tabs, Typography } from '@mui/material';
import ProfileImg from '../assets/sitter3.jpg';
import ReviewList from '../components/ReviewList';
import RequestBooking from '../components/RequestBooking';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function PublicProfile() {
    const { searchResults } = useSelector((state) => state.search)
    const [rating, setRating] = useState(5);
    const [bookingOpen, setBookingOpen] = useState(false);


    const { userId } = useParams();
    const viewedProfile = searchResults.find(search => search.userId === parseInt(userId));
    console.log(userId, searchResults, viewedProfile)

    const handleRating = (event) => {
        setRating(event.target.value);
    };

    const handleBookingForm = () => {
        setBookingOpen(!bookingOpen);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (

        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
        }}>

            <Modal
                open={bookingOpen}
                onClose={handleBookingForm}
            >
                <Box sx={modalStyle}>
                    <RequestBooking handleBookingForm={handleBookingForm}></RequestBooking>
                </Box>
            </Modal>

            <Box sx={{
                backgroundColor: 'primary.main',
                height: '20vh',
                width: '100%'
            }}>
            </Box>

            <Box sx={{ padding: 10, position: 'relative' }}>

                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        width: '90vw',
                        display: 'flex',
                        position: 'absolute',
                        top: '0%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2
                    }}>

                    <img style={{ width: 200}} src={ProfileImg} />

                    <Box>
                        <Typography variant='h4'>{viewedProfile.firstname} {viewedProfile.lastname}</Typography>
                        <Typography variant='p'>--</Typography>
                    </Box>

                </Box>

            </Box>

            <Box sx={{ width: '95vw', pb: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>

                <Box sx={{ 
                    flex: 1,
                    p: 2, 
                    border: '1px solid',
                    minWidth: 350,
                    height: ''
                    }}>
                    <Typography variant='h6'>ABOUT ME</Typography>
                    <Typography variant='p'>
                        {viewedProfile.desc}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={() => { handleBookingForm() }}
                        >Request Booking</Button>
                        <Button
                            variant="contained"
                        >Send Message</Button>
                    </Box>
                </Box>

                <Box sx={{ 
                    flex: 2, 
                    p: 2, 
                    width: '100%', 
                    minWidth: 400, 
                    border: '1px solid',
                }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>

                        <Typography variant='h5'>Customers Feedback</Typography>
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
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

                    </Box>

                    <ReviewList reviews={viewedProfile.reviews}></ReviewList>
                </Box>

            </Box>


        </Box>

    )
}

export default PublicProfile