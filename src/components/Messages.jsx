import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Box, Button, Card, CardActionArea, FormControl, IconButton, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function Messages() {

    return (

        <Box sx={{
            width: '90vw',
            maxWidth: 1600,
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'start',
            gap: 2
        }}>

            <Typography variant='h4'>Messages under construction</Typography>

            <Box sx={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: 2,
                flexWrap: 'wrap'
            }}>

                <Card sx={{ flex: 1, height: 600, minWidth: 300 }}>

                    <CardActionArea
                        onClick={() => { navigate(`/DogWatch/publicprofile/${result.uuid}`) }}
                    >

                        <Box
                            sx={{ display: 'flex', gap: 2, alignContent: 'center', p: 2 }}
                        >
                            <Avatar
                                sx={{
                                    height: 50,
                                    width: 50
                                }}
                                sizes='150'
                                alt="messagePerson"
                            //src={"http://localhost:8080/" + user.avatar}
                            >
                                <PersonIcon
                                    sx={{
                                        width: 20,
                                        height: 20
                                    }}>
                                </PersonIcon>
                            </Avatar>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography align='left' variant='p' fontWeight='bold'>Liam Nelson</Typography>
                                <Typography align='left' variant='p'>Active now</Typography>
                            </Box>

                        </Box>

                    </CardActionArea>

                    <CardActionArea
                        onClick={() => { navigate(`/DogWatch/publicprofile/${result.uuid}`) }}
                    >

                        <Box
                            sx={{ display: 'flex', gap: 2, alignContent: 'center', p: 2 }}
                        >
                            <Avatar
                                sx={{
                                    height: 50,
                                    width: 50
                                }}
                                sizes='150'
                                alt="messagePerson"
                            //src={"http://localhost:8080/" + user.avatar}
                            >
                                <PersonIcon
                                    sx={{
                                        width: 20,
                                        height: 20
                                    }}>
                                </PersonIcon>
                            </Avatar>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography align='left' variant='p' fontWeight='bold'>Liam Nelson</Typography>
                                <Typography align='left' variant='p'>Active now</Typography>
                            </Box>

                        </Box>

                    </CardActionArea>

                </Card>

                <Card sx={{ flex: 2, height: 600, minWidth: 300, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>

                    <Box
                        sx={{ display: 'flex', gap: 2, alignContent: 'center', p: 2 }}
                    >
                        <Avatar
                            sx={{
                                height: 64,
                                width: 64
                            }}
                            sizes='150'
                            alt="messagePartner"
                        //src={"http://localhost:8080/" + user.avatar}
                        >
                            <PersonIcon
                                sx={{
                                    width: 30,
                                    height: 30
                                }}>
                            </PersonIcon>
                        </Avatar>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography align='left' variant='h6'>Liam Nelson</Typography>
                            <Typography align='left' variant='p'>Active now</Typography>
                        </Box>

                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            overflowY: 'auto',
                            p: 2
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-start',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-end',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-end',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-start',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-start',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-start',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-start',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            //TODO define in flex direction which side the message is.
                            alignSelf: 'flex-start',
                            backgroundColor: 'primary.main',
                            width: '60%',
                            p: 1
                        }}>
                            <Typography variant='p'>asdsadsad sadasdsa  sadsad</Typography>
                        </Box>

                    </Box>

                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>

                        <FormControl sx={{ width: '100%' }}>
                            <TextField
                                id="message-input"
                                label="Message"
                                variant="outlined"

                            />
                        </FormControl>

                        <Button
                            variant="contained"
                        >Send
                        </Button>

                    </Box>

                </Card>
            </Box>
        </Box>

    )
}

export default Messages