import { Card, CardContent, Box, Typography } from '@mui/material';

function InfoCards() {


    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Card sx={{ margin: 1, maxWidth: 400 }} variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                        Easy & Quick Search
                    </Typography>
                    <Typography variant="h5" component="div">
                        Search of dog sitters based on location, availability, and specific needs
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ margin: 1, maxWidth: 400 }} variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                        Streamlined Booking
                    </Typography>
                    <Typography variant="h5" component="div">
                        User-friendly calendar for managing dog sitter availability, possibility to request, confirm or decline bookings
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ margin: 1, maxWidth: 400 }} variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                        Direct Messaging
                    </Typography>
                    <Typography variant="h5" component="div">
                        Direct discussion with potential dog sitters about dog's needs, asking questions, and arranging details before finalizing a booking
                    </Typography>
                </CardContent>
            </Card>

        </Box>
    )

}

export default InfoCards
