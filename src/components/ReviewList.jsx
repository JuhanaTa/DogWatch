import { Avatar, Box, Rating, Typography } from '@mui/material';
import { format } from 'date-fns';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';

function ReviewList({ reviews }) {

    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    function ReviewItem({ review }) {

        const createdDate = format(new Date(review.createdAt), "MMMM d, yyyy, HH:mm")

        return (

            <Box
                sx={{ display: 'flex', alignItems: 'flex-start' }}
            >
                <Box sx={{ p: 1 }}>

                    <Avatar
                        sx={{
                            height: 60,
                            width: 60
                        }}
                        alt="reviewAvatar"
                        src={"http://localhost:8080/" + review.reviewer.avatar}
                    >
                        <PersonIcon
                            sx={{
                                width: 20,
                                height: 20
                            }}>
                        </PersonIcon>
                    </Avatar>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    <Typography variant='p' fontWeight='bold'>{review.reviewer.firstName} {review.reviewer.lastName}</Typography>
                    <Rating name="read-only" value={parseInt(review.rating)} readOnly />
                    <Typography variant='p'>{createdDate}</Typography>
                    <Typography align='left' variant='p'>{review.comment}</Typography>
                </Box>
            </Box>

        );
    }

    return (
        <Box
            sx={{ maxHeight: 900, bgcolor: 'secondary.main', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}
        >
            {reviews.length > 0 ?
                reviews.map((review, index) => (
                    <ReviewItem key={index} review={review}></ReviewItem>
                ))
                :
                <Typography align='left' variant='p'>No reviews with selected filter.</Typography>
            }

        </Box>
    )
}

export default ReviewList