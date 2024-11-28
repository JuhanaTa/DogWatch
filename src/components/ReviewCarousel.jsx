import { Box, Typography, List, ListItem, IconButton, Avatar } from '@mui/material';
import ProfileImg from '../assets/sitter3.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

function ReviewCarousel() {

    const [showReview, setShowReview] = useState(0)

    const handleReviewForward = () => {
        if (reviewData.length != showReview) setShowReview(showReview + 1);
    };

    const handleReviewBack = () => {
        if (showReview > 0) setShowReview(showReview - 1);
    };

    const reviewData = [
        {
            name: 'Robert Harris',
            reviewTxt: 'Perfect match for my pup! DogWatch has been a game-changer for me and my dog - Oscar. The sitter I found was not only reliable but also incredibly attentive to his needs. I highly recommend this service!',
            grade: 5,
            img: 'ADD IMAGE HERE'
        },
        {
            name: 'Liam nelsson',
            reviewTxt: 'DogWatch is a lifesaver for busy schedules! The platform made it easy to connect with experienced dog sitters. My dog Nala comes home happy and well-exercised every single time!',
            grade: 5,
            img: 'ADD IMAGE HERE'
        },
        {
            name: 'Li Wei',
            reviewTxt: 'DogWatch helped me find the perfect overnight sitter during a recent trip. The entire process, from booking to the actual care, was seamless! Amazing care and convenience! !',
            grade: 5,
            img: 'ADD IMAGE HERE'
        },

    ]

    console.log('vlaues', reviewData.length, showReview)

    return (

        <Box sx={{ display: 'flex', width: '100%', maxWidth: 800, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

            <Typography sx={{ width: 240 }} variant='h4'>What Our Customers Say</Typography>

            <List sx={{ flexDirection: 'row', display: 'flex' }}>

                <ListItem sx={{ gap: 2, width: '100%' }}>

                    <IconButton disabled={showReview === 0} onClick={handleReviewBack}
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            },
                        }} color="secondary" aria-label="back" size="medium">
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>

                    <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>

                        <Avatar
                            sx={{
                                height: 125,
                                width: 125
                            }}
                            sizes='150'
                            alt="profile"
                            src={ProfileImg}
                            //src={user.avatar ? VITE_IMAGE_URL + "/" + user.avatar : null}
                        >
                            <PersonIcon
                                sx={{
                                    width: 60,
                                    height: 60
                                }}>
                            </PersonIcon>
                        </Avatar>


                        <Typography variant='p'>{reviewData[showReview].reviewTxt}</Typography>

                        <Typography fontWeight={'bold'} variant='p'>{reviewData[showReview].name}</Typography>

                    </Box>


                    <IconButton disabled={reviewData.length - 1 > showReview ? false : true} onClick={handleReviewForward}
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            },
                        }}
                        color="secondary" aria-label="forward" size="medium">
                        <ArrowForwardIcon fontSize="large" />
                    </IconButton>

                </ListItem>

            </List>

        </Box>


    )

}

export default ReviewCarousel
