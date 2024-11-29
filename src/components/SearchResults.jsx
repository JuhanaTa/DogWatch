import { Card, CardContent, Typography, CardActionArea, Grid2 as Grid, Rating, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function SearchResults({ preview }) {
    const navigate = useNavigate();

    const { searchResults, sittersList, searchParameters } = useSelector((state) => state.data)
    
    let results = []

    if (preview) {
        //Sitters on mainpage
        //Show only 6 first sitters.
        results = sittersList.slice(0, 6)
    } else {
        //Filtered sitters

        if(Object.keys(searchParameters).length > 0){
            results = searchResults
        } else {
            results = sittersList
        }

    }

    return (
        <>
            {results.length > 0 ?

                <Grid
                    container
                    spacing={2}
                    sx={{
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
                                        src={result.avatar ? VITE_IMAGE_URL + "/" + result.avatar : null}
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
                :
                <Typography variant='p'>Search results are empty. Try to search sitters again!</Typography>
            }
        </>
    )

}

export default SearchResults