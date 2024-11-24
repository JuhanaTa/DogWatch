import { Box, Typography, List, ListItem, IconButton } from '@mui/material';
import ProfileImg from '../assets/sitter3.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

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
            name: 'Christine Beckam',
            reviewTxt: 'I’m so grateful for the opportunity DogWatch provides! I got a wonderful care of my dog, he was well-fed, entertained, and comfortable throughout my absence. My dog sitter’s attention to detail and genuine love for dogs were evident in the daily updates and photos they provided.',
            grade: 4,
            img: 'ADD IMAGE HERE'
        },
        {
            name: 'Liam nelsson',
            reviewTxt: 'I’m grateful too!!!',
            grade: 5,
            img: 'ADD IMAGE HERE'
        },
        {
            name: 'Christine Beckam',
            reviewTxt: 'I’m so grateful for the opportunity DogWatch provides! I got a wonderful care of my dog, he was well-fed, entertained, and comfortable throughout my absence. My dog sitter’s attention to detail and genuine love for dogs were evident in the daily updates and photos they provided.',
            grade: 4,
            img: 'ADD IMAGE HERE'
        },
        {
            name: 'Liam nelsson',
            reviewTxt: 'I’m grateful too!!!',
            grade: 5,
            img: 'ADD IMAGE HERE'
        },

    ]

    console.log('vlaues', reviewData.length, showReview)

    return (

        <Box sx={{ display: 'flex', width: '100%', maxWidth: 800, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

            <Typography variant='h4'>What Our Customers Say</Typography>

            <List sx={{ flexDirection: 'row', display: 'flex' }}>

                <ListItem sx={{ gap: 6, width: '100%'}}>

                    <IconButton disabled={showReview === 0 } onClick={handleReviewBack}
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            },
                        }} color="secondary" aria-label="back" size="medium">
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>

                    <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', gap: 3, width: '100%'}}>

                        <img style={{ width: 160 }} loading='lazy' src={ProfileImg} />

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



//Saved if we decide to use proper list. Now its a bit hacky :D

/*
            <List sx={{ flexDirection: 'row', display: 'flex' }}>

                {reviewData.map((review) => (
                    <ListItem key={review.name} sx={{ gap: 6, width: '50%' }}>

                        <IconButton sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            },
                        }} color="secondary" aria-label="back" size="medium">
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>

                        <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', gap: 3 }}>

                            <Typography variant='h3'>What Our Customers Say</Typography>
                            <img style={{ width: 160 }} loading='lazy' src={ProfileImg} />

                            <Typography variant='p'>I’m so grateful for the opportunity DogWatch provides! I got a wonderful care of my dog, he was well-fed, entertained, and comfortable throughout my absence. My dog sitter’s attention to detail and genuine love for dogs were evident in the daily updates and photos they provided.</Typography>

                            <Typography fontWeight={'bold'} variant='p'>{review.name}</Typography>

                        </Box>

                        <IconButton sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            },
                        }}
                            color="secondary" aria-label="forward" size="medium">
                            <ArrowForwardIcon fontSize="large" />
                        </IconButton>

                    </ListItem>
                ))}

            </List>
*/