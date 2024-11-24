import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Box, Rating, Typography } from '@mui/material';
import { format } from 'date-fns';

function ReviewList({ reviews }) {

    function ReviewItem({review}) {
        console.log('reviews', reviews)
        const createdDate = format(new Date(review.createdAt), "MMMM d, yyyy, h:mm a")


        return (

            <Box
                sx={{display: 'flex', alignItems: 'flex-start'}}
            >
                <Box sx={{ p: 1 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    <Typography variant='h6'>{review.from}</Typography>
                    <Rating name="read-only" value={parseInt(review.rating)} readOnly />
                    <Typography variant='p'>{createdDate}</Typography>
                    <Typography align='left' variant='p'>{review.comment}</Typography>
                </Box>
            </Box>

        );
    }

    return (
        <Box
            sx={{ maxHeight: 1000, bgcolor: 'secondary.main', display: 'flex', flexDirection: 'row', gap: 2, overflowY: 'auto' }}
        >
            {reviews.length > 0 ?
                reviews.map((review, index) => (
                    <ReviewItem key={index} review={review}></ReviewItem>
                ))
                :
                <Typography align='left' variant='p'>No reviews yet on this profile.</Typography>
            }

        </Box>
    )
}

export default ReviewList

/*

                            <FixedSizeList
                    height={400}
                    itemSize={175}
                    itemCount={reviews.length}
                    overscanCount={5}
                >
                    {({ index, style }) => reviewItem({ index, style })}
                </FixedSizeList>


            <ListItem
                style={{
                    ...style,
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
                key={index}
                component="div"
                disablePadding
            >

                <Box sx={{p: 1}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />                
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    <Typography variant='h6'>{reviews[index].from}</Typography>
                    <Rating name="read-only" value={reviews[index].rating} readOnly />
                    <Typography variant='p'>{formattedDate}</Typography>
                    <Typography variant='p'>{reviews[index].comment}</Typography>
                </Box>

            </ListItem>
*/