import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Box, Button, Card, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import ReviewList from '../components/ReviewList';
import RequestBooking from '../components/RequestBooking';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPubliUserData } from '../requests/dataRequests';
import PersonIcon from '@mui/icons-material/Person';
import SendUserMessage from '../components/SendUserMessage';

function PublicProfile() {
    const { user } = useSelector((state) => state.user)

    const [ratingFilter, setRatingFilter] = useState(5)
    const [bookingOpen, setBookingOpen] = useState(false);
    const [sendMessageOpen, setSendMessageOpen] = useState(false);

    const [viewedProfile, setViewedProfile] = useState(null)
    const [requestError, setRequestError] = useState(null)
    const [currentReviews, setCurrentReviews] = useState([])

    const { uuid } = useParams();
    const navigate = useNavigate();

    const handleReviewFilter = (rating, reviews) => {
        const filteredReviews = reviews.filter(review => review.rating === rating);
        setCurrentReviews(filteredReviews)
    }

    const handleRating = (event) => {
        setRatingFilter(parseInt(event.target.value));
        handleReviewFilter(parseInt(event.target.value), viewedProfile.receivedReviews);
    };

    const handleBookingForm = () => {
        if (user) {
            if (user.role === "owner") {
                setBookingOpen(!bookingOpen);
            } else {
                setRequestError("Sitters can't make requests.")
            }
        } else {
            navigate(`/DogWatch/login`)
        }
    };

    const handleMessageForm = () => {
        if (user) {
            if (user.uuid !== viewedProfile.uuid) {
                setSendMessageOpen(!sendMessageOpen);
            } else {
                setRequestError("You can't send message to yourself.")
            }
        } else {
            navigate(`/DogWatch/login`)
        }
    };

    const handleSendMessage = () => {
        if (user) {
            //setBookingOpen(!bookingOpen);
        } else {
            navigate(`/DogWatch/login`)
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

    const getViewedProfile = async () => {
        try {
            const profile = await getPubliUserData(uuid)
            console.log('profile', profile)
            setViewedProfile(profile)
            handleReviewFilter(ratingFilter, profile.receivedReviews)
            //setCurrentReviews(profile.receivedReviews)
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

                    <Modal
                        open={sendMessageOpen}
                        onClose={handleMessageForm}
                    >
                        <Box sx={modalStyle}>
                            <SendUserMessage receiverId={viewedProfile.uuid} receiverFirstName={viewedProfile.firstName} receiverLastname={viewedProfile.lastName} setSendMessageOpen={setSendMessageOpen}></SendUserMessage>
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
                                maxWidth: 1600,
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

                            <Avatar
                                sx={{
                                    height: 150,
                                    width: 150
                                }}
                                alt="Remy Sharp"
                                src={viewedProfile.avatar ? "http://localhost:8080/" + viewedProfile.avatar : null}
                            >
                                <PersonIcon
                                    sx={{
                                        width: 60,
                                        height: 60
                                    }}>
                                </PersonIcon>
                            </Avatar>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography align='left' variant='h4'>{viewedProfile.firstName} {viewedProfile.lastName}</Typography>
                                <Typography align='left' variant='p'>--</Typography>
                            </Box>

                        </Box>

                    </Box>

                    <Box sx={{ width: '95vw', maxWidth: 1600, pb: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>

                        <Card sx={{
                            flex: 1,
                            p: 2,
                            minWidth: 300,
                            height: '',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}>
                            <Typography variant='h6'>ABOUT ME</Typography>
                            <Typography align='left' variant='p'>
                                {viewedProfile.description}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => { handleBookingForm() }}
                                >Request Booking</Button>
                                <Button
                                    variant="contained"
                                    onClick={() => { handleMessageForm() }}
                                >Send Message</Button>
                            </Box>
                            {requestError != null &&
                                <Typography variant='p' color='error'>{requestError}</Typography>
                            }
                        </Card>

                        <Card sx={{
                            flex: 2,
                            p: 2,
                            minWidth: 300,
                        }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>

                                <Typography variant='h5'>Customers Feedback</Typography>
                                <FormControl sx={{ m: 1, width: 125 }}>
                                    <InputLabel id="demo-simple-select-label">Sort by rating</InputLabel>
                                    <Select
                                        labelId="rating-label"
                                        id="rating-select"
                                        value={ratingFilter}
                                        label="Sort by rating"
                                        onChange={handleRating}
                                    >
                                        <MenuItem value={1}>1 star</MenuItem>
                                        <MenuItem value={2}>2 stars</MenuItem>
                                        <MenuItem value={3}>3 stars</MenuItem>
                                        <MenuItem value={4}>4 stars</MenuItem>
                                        <MenuItem value={5}>5 stars</MenuItem>
                                    </Select>

                                </FormControl>

                            </Box>

                            <ReviewList reviews={currentReviews}></ReviewList>

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