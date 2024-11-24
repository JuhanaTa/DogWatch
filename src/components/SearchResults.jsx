import { Card, CardContent, Box, Typography, CardActionArea, CardMedia, Grid2 as Grid, Rating, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

function SearchResults({ preview }) {
    const navigate = useNavigate();

    const { searchResults, sittersList } = useSelector((state) => state.data)

    let results = []

    if (preview) {
        //Sitters on mainpage
        //Show only 6 first sitters.
        results = sittersList.slice(0, 6)
    } else {
        //Filtered sitters
        results = searchResults
    }

    console.log('search sitters', results)

    return (
        <Grid
            container
            spacing={2}
            sx={{
                width: '70vw',
                maxWidth: 850,
                p: 2
            }}
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
                        sx={{ width: 250, p: 0 }}

                    >
                        <CardActionArea
                            onClick={() => { navigate(`/publicprofile/${result.uuid}`) }}
                        >

                            <Avatar
                                sx={{
                                    height: 250,
                                    width: 250
                                }}
                                variant='square'
                                alt="profilepic"
                                src={"http://localhost:8080/" + result.avatar}
                            >
                                <PersonIcon
                                    sx={{
                                        width: 100,
                                        height: 100
                                    }}>
                                </PersonIcon>
                            </Avatar>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    p: 1,
                                    gap: 0.5
                                }}
                            >

                                <Rating
                                    name="read-only"
                                    value={
                                        result.receivedReviews?.length > 0 ?
                                            result.receivedReviews.reduce((acc, review) => acc + review.rating, 0) / result.receivedReviews.length
                                            :
                                            0
                                    }
                                    //result.reviews[0].rating
                                    //0

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
                                    {
                                        result.reviews ?
                                            result.reviews.reduce((acc, review) => acc + review.rating, 0) / result.reviews.length
                                            :
                                            0

                                    }
*/

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