import { Box, Button, FormControl, Rating, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { leaveSitterReview } from '../reducers/DataReducer';

function ReviewSitter({ handleReviewForm, booking }) {
    const { leaveSitterReviewError } = useSelector((state) => state.data)
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);


    const handleRating = (event) => {
        console.log('rating', event.target.value)
        setRating(parseInt(event.target.value));
    };

    const handleDescription = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    const handleReviewRequest = () => {

        const ratingData = {
            rating: rating,
            comment: description,
        }

        dispatch(leaveSitterReview(
            {
                ratingData:ratingData,
                bookingId: booking.uuid,
                token: token
            }
        )).then((res)=>{
            if(res.payload){
                handleReviewForm()
            }
        })

    } 

    return (

        <Box sx={{ backgroundColor: 'secondary.main', gap: 2, display: 'flex', flexDirection: 'column' }}>

            <Box>
                <Typography align='left' variant="h6" sx={{ color: 'text.primary' }}>Leave a review</Typography>
                <Typography align='left' variant="p" sx={{ color: 'text.primary' }}>for: {booking.sitter.firstName} {booking.sitter.lastName}</Typography>
            </Box>



            <Box sx={{ gap: 2, width: 150 }}>

                <Typography>Rating</Typography>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRating}
                />

            </Box>

            <FormControl sx={{ width: '100%', minWidth: 225 }}>
                <TextField
                    id="desc-input"
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={handleDescription}
                />
            </FormControl>

            <Button
                onClick={handleReviewRequest}
                variant="contained"
                endIcon={<SendIcon />}
            >
                Submit review
            </Button>



            {leaveSitterReviewError &&
                <Typography variant='p' color='error'>{leaveSitterReviewError}</Typography>
            }

        </Box>

    )
}

export default ReviewSitter