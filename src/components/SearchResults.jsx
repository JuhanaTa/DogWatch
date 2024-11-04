import { Card, CardContent, Box, Typography, CardActionArea, CardMedia, Grid2 as Grid } from '@mui/material';

function SearchResults({ preview }) {

    let results = []

    if (preview) {

        results = [
            { name: "Sitter1", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
            { name: "Sitter2", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
            { name: "Sitter3", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
        ]

    } else {
        // TODO -- Create server request for dog sitters
        results = [
            { name: "Sitter1", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
            { name: "Sitter2", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
            { name: "Sitter3", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
            { name: "Sitter4", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
            { name: "Sitter5", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
            { name: "Sitter6", desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
        ]
    }




    return (
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
    )

}

export default SearchResults