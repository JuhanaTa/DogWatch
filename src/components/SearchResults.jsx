import { Card, CardContent, Box, Typography, CardActionArea, CardMedia, Grid2 as Grid, Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SearchResults({ preview }) {
    const navigate = useNavigate();

    const { searchResults, sittersList } = useSelector((state) => state.data)

    let results = []

    if (preview) {
        //Sitters on mainpage
        results = sittersList
    } else {
        //Filtered sitters
        results = searchResults
    }

    console.log('search sitters', results)

    return (
        <Grid
            container
            spacing={2}
            sx={{ width: '70vw', p: 2 }}
            justifyContent={"center"}
            alignItems={"center"}
        >

            {results.map((result, index) => (
                <Grid
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    key={index}
                >
                    <Card
                        sx={{ width: 250 }}

                    >
                        <CardActionArea
                            onClick={() => { navigate(`/publicprofile/${result.uuid}`) }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={result.image}
                                alt="Image"
                            />
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}
                            >

                                <Rating
                                    name="read-only"
                                    value={
                                        //result.reviews[0].rating
                                        0
                                    }
                                    readOnly
                                />

                                <Typography gutterBottom variant="p">
                                    {result.firstName} {result.lastName}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )

}

export default SearchResults

/*
        <Grid container spacing={3} sx={{ maxWidth: '80vw' }}>

            {results.map((result) => (
                <Grid xs={12} sm={6} md={4} key={result.name}>
                    <Card sx={{ maxWidth: 250 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image=""
                                alt="Image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {result.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {result.desc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
*/


/*
        <Box sx={{ maxWidth: '80vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>

            {results.map((result) => (
                    <Card sx={{ maxWidth: 250, flex: '1 1 calc(33% - 10px)' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image=""
                                alt="Image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {result.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {result.desc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            ))}
        </Box>
*/