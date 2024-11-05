import cover from '../assets/backgroundSearch.svg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchBox from '../components/SearchBox';
import { Avatar, Box, Divider, ListItem, ListItemButton, ListItemText, Rating, Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';

function ReviewList() {

    const reviews = [
        {
            name: 'Guy Hawkins',
            rating: 5,
            ratingText: 'Absolutely wonderful experience! My dog was well cared for, and the sitter sent regular updates with photos. I felt so at ease during my trip.'
        },
        {
            name: 'Dianne Russell',
            rating: 4,
            ratingText: 'This dog sitter was amazing! They treated my dog like family, and I could tell my pup was very happy and relaxed when I returned'
        },
        {
            name: 'Bessie Cooper',
            rating: 5,
            ratingText: 'I’ve never seen my dog this calm after coming home from being watched. They took such good care of her, and even gave her some extra playtime!'
        },
        {
            name: 'Bessie Cooper',
            rating: 5,
            ratingText: 'I’ve never seen my dog this calm after coming home from being watched. They took such good care of her, and even gave her some extra playtime!'
        },

    ]

    function reviewItem(props) {
        const { index, style } = props;
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
                    <Typography variant='h6'>{reviews[index].name}</Typography>
                    <Rating name="read-only" value={reviews[index].rating} readOnly />
                    <Typography variant='p'>{reviews[index].ratingText}</Typography>
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
                itemSize={120}
                itemCount={reviews.length}
                overscanCount={5}
            >
                {reviewItem}
            </FixedSizeList>

        </Box>
    )
}

export default ReviewList