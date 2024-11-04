import { Card, CardContent, Box, Typography } from '@mui/material';
import { SvgIcon, Icon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

function InfoCards() {

    return (
        <Box sx={{ display: { md: 'flex' } }}>

            <Card sx={{ margin: 1, maxWidth: 300, boxShadow: 2 }} variant="outlined">
                <CardContent>
                    <SearchIcon sx={{ fontSize: 60 }}></SearchIcon>
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                        Easy & Quick Search
                    </Typography>
                    <Typography variant="p" component="div">
                        Search of dog sitters based on location, availability, and specific needs
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ margin: 1, maxWidth: 300, boxShadow: 2 }} variant="outlined">
                <CardContent>
                    <EventAvailableIcon sx={{ fontSize: 60 }}></EventAvailableIcon>
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                        Streamlined Booking
                    </Typography>
                    <Typography variant="p" component="div">
                        User-friendly calendar for managing dog sitter availability, possibility to request, confirm or decline bookings
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ margin: 1, maxWidth: 300, boxShadow: 2 }} variant="outlined">
                <CardContent>
                    <QuestionAnswerOutlinedIcon sx={{ fontSize: 60 }}></QuestionAnswerOutlinedIcon>
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                        Direct Messaging
                    </Typography>
                    <Typography variant="p" component="div">
                        Direct discussion with potential dog sitters about dog's needs, asking questions, and arranging details before finalizing a booking
                    </Typography>
                </CardContent>
            </Card>

        </Box>
    )

}

export default InfoCards
