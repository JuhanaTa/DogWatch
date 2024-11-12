import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Tab, Tabs, Typography } from '@mui/material';
import ProfileImg from '../assets/DogSitterImage.png';
import ReviewList from '../components/ReviewList';
import RequestBooking from '../components/RequestBooking';

function PublicProfile() {

    const [rating, setRating] = useState(5);
    const [bookingOpen, setBookingOpen] = useState(false);

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

                    <img src={ProfileImg} />

                    <Box>
                        <Typography variant='h4'>Meri Suomalainen</Typography>
                        <Typography variant='p'>Mother of Charlie</Typography>
                    </Box>

                </Box>

            </Box>

            <Box sx={{ width: '95vw', p: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>

                <Box sx={{ flex: 1, p: 2, border: '1px solid' }}>
                    <Typography variant='h6'>ABOUT ME</Typography>
                    <Typography variant='p'>Hi there! I'm Liam, a passionate dog lover based in Helsinki, offering reliable dog walking and daycare services for your furry friends.

                        As an experienced pet sitter, I understand that every dog is unique, and I take pride in providing personalized care tailored to each dog’s needs. Whether it's a fun walk through Helsinki's beautiful parks or a cozy day at home with plenty of playtime, I ensure your dog is safe, happy, and well cared for.

                        I’m dedicated to creating a comfortable and engaging environment for dogs of all sizes and breeds. With regular updates, you’ll always know your pet is in great hands. Let me take care of your dog's daily exercise and social needs, giving you peace of mind while you're away.

                        Feel free to reach out—I’d love to meet you and your dog!
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={() => { handleBookingForm() }}
                        >Request Booking</Button>
                        <Button
                            variant="contained"
                        >Send Message</Button>
                    </Box>
                </Box>

                <Box sx={{ flex: 2, p: 2, width: '100%', minWidth: 400, border: '1px solid' }}>

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

                    <ReviewList></ReviewList>
                </Box>

            </Box>


        </Box>

    )
}

export default PublicProfile