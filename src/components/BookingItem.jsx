import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Box, Button, Card, Divider, IconButton, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { format } from 'date-fns';
import ReviewSitter from './ReviewSitter';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import SendUserMessage from './SendUserMessage';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function BookingItem({ booking }) {

    const { services } = useSelector((state) => state.data)
    const { user } = useSelector((state) => state.user)
    const [sendMessageOpen, setSendMessageOpen] = useState(false);
    const [open, setOpen] = useState(false)

    console.log('booking', booking, user.uuid)

    const endDate = format(new Date(booking.endDate), "MMMM d, yyyy, HH:mm")
    const startDate = format(new Date(booking.startDate), "MMMM d, yyyy, HH:mm")
    const createdDate = format(new Date(booking.createdAt), "MMMM d, yyyy, HH:mm")

    const bookingService = services.find(serviceItem => booking.serviceId === serviceItem.uuid)


    const handleOpen = () => setOpen(!open);

    const handleMessagesOpen = () => {
        console.log('messages should open')
    }

    const [reviewOpen, setReviewOpen] = useState(false);

    const handleReviewForm = () => {
        setReviewOpen(!reviewOpen);
    };

    const handleMessageForm = () => {
        if (user) {
            setSendMessageOpen(!sendMessageOpen);
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


    return (

        <Card
            sx={{
                width: '100%',
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

            <Modal
                open={sendMessageOpen}
                onClose={() => setSendMessageOpen(false)}
            >
                <Box sx={modalStyle}>
                    <SendUserMessage
                        receiverId={user.role === "sitter" ? booking.ownerId : booking.sitterId}
                        receiverFirstName={user.role === "sitter" ? booking.owner.firstName : booking.sitter.firstName}
                        receiverLastname={user.role === "sitter" ? booking.owner.lastName : booking.sitter.lastName}
                        setSendMessageOpen={setSendMessageOpen}>
                    </SendUserMessage>
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
                    <Typography variant='p' color='success'>Status: {booking.status}</Typography>
   
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

                            <Avatar
                                sx={{
                                    height: 120,
                                    width: 120
                                }}
                                alt="BookingAvatar"
                                src={booking.owner.avatar ? VITE_IMAGE_URL + "/" + booking.owner.avatar : null}
                            >
                                <PersonIcon
                                    sx={{
                                        width: 60,
                                        height: 60
                                    }}>
                                </PersonIcon>
                            </Avatar>

                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    display: 'flex',
                                    alignItems: 'start',
                                }}
                            >
                                <Typography variant='p'>Services</Typography>
                                <Typography variant='p' sx={{ fontWeight: 'bold' }}>{bookingService.name} in {booking.location}</Typography>

                                <Typography variant='p' sx={{ fontWeight: 'bold' }}>{startDate} - {endDate}</Typography>

                                {booking.ownerId === user.uuid ?
                                    <Typography variant='p'>Requested by: You</Typography>
                                    :
                                    <Typography variant='p'>Requested by: {booking.owner.firstName} {booking.owner.lastName}</Typography>
                                }

                                {booking.sitterId === user.uuid ?
                                    <Typography variant='p'>Sitter: You</Typography>
                                    :
                                    <Typography variant='p'>Sitter: {booking.sitter.firstName} {booking.sitter.lastName}</Typography>
                                }

                            </Box>
                        </Box>



                        <Box>

                            <IconButton
                                color="secondary"
                                sx={{
                                    backgroundColor: "primary.main",
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                                aria-label="open messages"
                                onClick={handleMessageForm}
                            >
                                <ForumIcon />
                            </IconButton>

                            {user.role === "owner" &&
                                <>
                                    {
                                        booking.status === "completed" &&
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
                                </>
                            }
                        </Box>


                    </Box>
                </>
            }

        </Card>

    )
}

export default BookingItem