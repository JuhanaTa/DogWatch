import { Box, Divider, Stack, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 1600,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    rowGap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        flexDirection: 'column',
                        gap: 4,
                        maxWidth: 300,

                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'start',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography color='text.white' variant='h4' fontWeight={'bold'}>DogWatch</Typography>
                        <Typography align="left" color='text.white' variant='p' >Service designed to connect dog owners with reliable and caring dog sitters in their local area.</Typography>
                    </Box>
                    <Typography color='text.highlight' variant='p' >Read More</Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1
                        }}
                    >
                        <FacebookIcon sx={{ color: 'text.white' }} />
                        <TwitterIcon sx={{ color: 'text.white' }} />
                        <LinkedInIcon sx={{ color: 'text.white' }} />
                        <InstagramIcon sx={{ color: 'text.white' }} />

                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: 300
                    }}
                >

                    <Typography color='text.highlight' variant='h6'>Quick Links</Typography>


                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'start',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >

                        <Stack alignItems="center" direction="row" gap={2}>
                            <PlayArrowIcon sx={{ color: 'text.white' }} />
                            <Typography color='text.white' variant='p' >Home</Typography>
                        </Stack>

                        <Stack alignItems="center" direction="row" gap={2}>
                            <PlayArrowIcon sx={{ color: 'text.white' }} />
                            <Typography color='text.white' variant='p' >Search</Typography>
                        </Stack>

                        <Stack alignItems="center" direction="row" gap={2}>
                            <PlayArrowIcon sx={{ color: 'text.white' }} />
                            <Typography color='text.white' variant='p' >Log In</Typography>
                        </Stack>

                        <Stack alignItems="center" direction="row" gap={2}>
                            <PlayArrowIcon sx={{ color: 'text.white' }} />
                            <Typography color='text.white' variant='p' >Terms of Service</Typography>
                        </Stack>

                        <Stack alignItems="center" direction="row" gap={2}>
                            <PlayArrowIcon sx={{ color: 'text.white' }} />
                            <Typography color='text.white' variant='p' >Privacy Policy</Typography>
                        </Stack>

                        <Stack alignItems="center" direction="row" gap={2}>
                            <PlayArrowIcon sx={{ color: 'text.white' }} />
                            <Typography color='text.white' variant='p' >Report an issue</Typography>
                        </Stack>

                    </Box>

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: 300
                    }}
                >

                    <Typography color='text.highlight' variant='h6'>Contact</Typography>


                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'start',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        <Typography align="left" color='text.white' variant='p' >Phone: +358 123 456 78</Typography>
                        <Typography align="left" color='text.white' variant='p' >Email: dogwatch@gmail.com</Typography>
                        <Typography align="left" color='text.white' variant='p' >Address: Otakaari 1</Typography>
                        <Stack alignItems="center" direction="row" gap={2}>
                            <AccessTimeIcon sx={{ color: 'text.white' }} />
                            <Typography align="left" color='text.white' variant='p' >Mon - Sun 24/7</Typography>
                        </Stack>

                    </Box>

                </Box>

            </Box>


            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 10
            }}>
                <Divider sx={{ bgcolor: 'text.white' }}></Divider>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 1
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1
                        }}
                    >
                        <Typography align="left" color='text.white' variant='p' >@Copyright 2024</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1
                        }}
                    >
                        <Typography align="left" color='text.white' variant='p' >Privacy Policy </Typography>
                        <Typography align="left" color='text.white' variant='p' >Customer support </Typography>

                        <FacebookIcon sx={{ color: 'text.white' }} />
                        <TwitterIcon sx={{ color: 'text.white' }} />
                        <LinkedInIcon sx={{ color: 'text.white' }} />
                        <InstagramIcon sx={{ color: 'text.white' }} />
                    </Box>
                </Box>

            </Box>




        </Box>
    )
}

export default Footer