import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Card, CircularProgress, Container, Divider, FormControl, IconButton, Modal, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/sitter4.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userEdit } from '../reducers/UserReducer';
import ProfileImg from '../assets/sitter3.jpg';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { format } from 'date-fns';
import ReviewSitter from './ReviewSitter';

function BookingItem({ currentDate, booking }) {

    const { services } = useSelector((state) => state.data)
    const { user } = useSelector((state) => state.user)

    console.log('booking', booking)

    const endDate = format(new Date(booking.endDate), "MMMM d, yyyy")
    const startDate = format(new Date(booking.startDate), "MMMM d, yyyy")
    const createdDate = format(new Date(booking.createdAt), "MMMM d, yyyy, h:mm a")

    const bookingService = services.find(serviceItem => booking.serviceId === serviceItem.uuid)

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open);

    const handleMessagesOpen = () => {
        console.log('messages should open')
    }

    const [reviewOpen, setReviewOpen] = useState(false);

    const handleReviewForm = () => {
        setReviewOpen(!reviewOpen);
    };


    console.log('contains review', booking.reviews.some(review => review.reviewerId === user.uuid))

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

        <Card
            sx={{
                width: '90vw',
                display: 'flex',
                flexDirection: 'column',

            }}
        >

            <Modal
                open={reviewOpen}
                onClose={handleReviewForm}
            >
                <Box sx={modalStyle}>
                    <ReviewSitter handleReviewForm={handleReviewForm} setReviewOpen={setReviewOpen} booking={booking}></ReviewSitter>
                </Box>
            </Modal>

            <Box
                sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2
                }}
            >

                <Box
                    sx={{
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'start'
                    }}
                >
                    <Typography variant='p' sx={{ fontWeight: 'bold' }}>{createdDate}</Typography>
                    <Typography variant='p'>{bookingService.name} in {booking.location}</Typography>

                    {booking.status === "completed" ?
                        <Typography variant='p' color='success'>Status: {booking.status}</Typography>
                        :
                        <Typography variant='p' color='warning'>Status: {booking.status}</Typography>
                    }
                </Box>

                <IconButton
                    onClick={handleOpen}
                    aria-label="open-booking"
                    size="large"
                    sx={{ height: 48 }}
                >

                    {open ?
                        <ArrowUpward />
                        :
                        <ArrowDownward />
                    }
                </IconButton>

            </Box>

            {open &&
                <>

                    <Divider></Divider>

                    <Box
                        sx={{
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            p: 2,
                        }}
                    >

                        <Box
                            sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                alignItems: 'start',
                                flexWrap: 'wrap',
                                gap: 2
                            }}
                        >
                            <img style={{ width: 150, heigh: 150, borderRadius: '50%' }} src={ProfileImg} />

                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    display: 'flex',
                                    alignItems: 'start',
                                }}
                            >
                                <Typography variant='p' sx={{ fontWeight: 'bold' }}>When: {startDate} - {endDate}</Typography>
                                <Typography variant='p'>Sitter: {booking.sitter.firstName} {booking.sitter.lastName}</Typography>
                                <Typography variant='p'>Owner: {booking.owner.firstName} {booking.owner.lastName}</Typography>

                            </Box>
                        </Box>

                        {user.role === "owner" &&
                            <Box>
                                <Button
                                    sx={{ mr: 1 }}
                                    variant="contained"
                                    onClick={handleMessagesOpen}
                                >
                                    Contact
                                </Button>

                                {booking.status === "completed" &&
                                    <Button
                                        sx={{ ml: 1 }}
                                        variant="contained"
                                        disabled={booking.reviews.some(review => review.reviewerId === user.uuid)}
                                        onClick={handleReviewForm}
                                    >

                                        {booking.reviews.some(review => review.reviewerId === user.uuid) ?
                                            "Reviewed"
                                            :
                                            "Review"
                                        }
                                    </Button>
                                }
                            </Box>
                        }

                    </Box>
                </>
            }

        </Card>

    )
}

export default BookingItem