import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Card, CircularProgress, Container, FormControl, InputLabel, MenuItem, Modal, Select, Tab, Tabs, Typography } from '@mui/material';
import ProfileImg from '../assets/sitter3.jpg';
import ReviewList from '../components/ReviewList';
import RequestBooking from '../components/RequestBooking';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPubliUserData } from '../requests/dataRequests';

function PublicProfile() {
    const { user } = useSelector((state) => state.user)

    const [ratingFilter, setRatingFilter] = useState(5)
    const [bookingOpen, setBookingOpen] = useState(false);
    const [profileLoading, setProfileLoading] = useState(true)
    const [viewedProfile, setViewedProfile] = useState(null)

    console.log('viewed prof', viewedProfile)

    const { uuid } = useParams();
    const dispatch = useDispatch();
    console.log('UUID:', uuid);
    //const viewedProfile = sittersList.find(search => search.uuid === parseInt(uuid));


    const navigate = useNavigate();

    const handleRating = (event) => {
        setRatingFilter(event.target.value);
        
    };

    const handleBookingForm = () => {
        if (user) {
            setBookingOpen(!bookingOpen);
        } else {
            navigate(`/login`)
        }
    };

    const handleSendMessage = () => {
        if (user) {
            //setBookingOpen(!bookingOpen);
        } else {
            navigate(`/login`)
        }
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

    const getViewedProfile = async() => {
        try {
            const profile = await getPubliUserData(uuid)
            console.log('profile', profile)
            setViewedProfile(profile)
        } catch (error) {
            console.log('fail to load profile')
        }
    }

    useEffect(() => {
        getViewedProfile()
    }, []);




    return (

        <>
            {viewedProfile !== null ?
                <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
                }}>

                    <Modal
                        open={bookingOpen}
                        onClose={handleBookingForm}
                    >
                        <Box sx={modalStyle}>
                            <RequestBooking handleBookingForm={handleBookingForm} viewedProfile={viewedProfile} setBookingOpen={setBookingOpen}></RequestBooking>
                        </Box>
                    </Modal>


                    <Box sx={{
                        backgroundColor: 'primary.main',
                        height: 200,
                        width: '100%'
                    }}>
                    </Box>

                    <Box sx={{ padding: 5, position: 'relative' }}>

                        <Box
                            sx={{
                                backgroundColor: 'background.paper',
                                width: '90vw',
                                display: 'flex',
                                position: 'absolute',
                                top: '0%',
                                left: '50%',
                                transform: 'translate(-50%, -65%)',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                gap: 2,
                                flexWrap: 'wrap'
                            }}>

                            <img style={{ width: 200 }} src={ProfileImg} />

                            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                <Typography align='left' variant='h4'>{viewedProfile.firstName} {viewedProfile.lastName}</Typography>
                                <Typography align='left' variant='p'>--</Typography>
                            </Box>

                        </Box>

                    </Box>

                    <Box sx={{ width: '95vw', pb: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>

                        <Card sx={{
                            flex: 1,
                            p: 2,
                            minWidth: 300,
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
                                    onClick={() => { handleSendMessage() }}
                                >Send Message</Button>
                            </Box>
                        </Card>

                        <Card sx={{
                            flex: 2,
                            p: 2,
                            minWidth: 300,
                        }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>

                                <Typography variant='h5'>Customers Feedback</Typography>
                                <FormControl sx={{ m: 1 }}>
                                    <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                    <Select
                                        labelId="rating-label"
                                        id="rating-select"
                                        value={ratingFilter}
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

                            <ReviewList reviews={viewedProfile.receivedReviews}></ReviewList>

                        </Card>

                    </Box>


                </Box>

                :

                <CircularProgress></CircularProgress>
            }
        </>
    )
}

export default PublicProfile

/*
    For reviews once reviews fetched with user data

*/