import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Box, Divider, ListItem, ListItemButton, ListItemText, Rating, Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { format } from 'date-fns';

function ReviewList({reviews}) {

    function reviewItem(props) {
        const { index, style } = props;

        const date = new Date(reviews[index].created_at * 1000);
        const formattedDate = format(date, 'MMMM dd, yyyy HH:mm');

        return (
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
        )
    }

    return (
        <Box
            sx={{ width: '100%', maxHeight: 600, bgcolor: 'secondary.main' }}
        >

            <FixedSizeList
                height={400}
                itemSize={160}
                itemCount={reviews.length}
                overscanCount={5}
            >
                {reviewItem}
            </FixedSizeList>

        </Box>
    )
}

export default ReviewList