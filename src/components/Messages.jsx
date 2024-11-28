import { useContext, useEffect, useRef, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Box, Button, Card, CardActionArea, Divider, FormControl, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageToUser } from '../reducers/UserReducer';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function Messages() {
    const { user, userMessages, viewedProfileIndex } = useSelector((state) => state.user)

    const [message, setMessage] = useState('')
    const [viewedMsgPartner, setViewedMsgPartner] = useState(viewedProfileIndex)

    const dispatch = useDispatch();

    console.log('userMessages', userMessages)

    const token = localStorage.getItem('token');


    const handleMessageWrite = (event) => {
        setMessage(event.target.value)
    }

    const handleMessageSend = () => {

        const receiverId = userMessages[viewedMsgPartner].partnerId

        let data = {
            content: { content: message },
            receiverId: receiverId,
            token: token
        }

        dispatch(sendMessageToUser(data))

    }

    const handleMsgPartner = (index) => {
        setViewedMsgPartner(index)
    }

    return (

        <Box sx={{
            width: '90vw',
            maxWidth: 1600,
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'start',
            gap: 2
        }}>

            <Typography variant='h4'>Messages</Typography>

            {userMessages.length > 0 ?

                <Box sx={{
                    width: '100%',
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    gap: 2,
                    flexWrap: 'wrap'
                }}>


                    <Card sx={{ flex: 1, height: 600, minWidth: 300, overflowY: 'auto' }}>

                        {userMessages.length > 0 ?


                            userMessages.map((msgUser, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        backgroundColor: viewedMsgPartner === index ? 'primary.main' : 'secondary.main'
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() => { handleMsgPartner(index) }}
                                    >

                                        <Box
                                            sx={{ display: 'flex', gap: 2, alignContent: 'center', p: 2 }}
                                        >

                                            <Avatar
                                                sx={{
                                                    height: 50,
                                                    width: 50
                                                }}
                                                alt="partnerAvatar"
                                                src={msgUser.partnerAvatar ? VITE_IMAGE_URL + "/" + msgUser.partnerAvatar : null}
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
                                                flexDirection: 'column',
                                            }}>
                                                <Typography
                                                    align='left'
                                                    variant='p'
                                                    fontWeight='bold'
                                                    sx={{
                                                        color: viewedMsgPartner === index ? 'text.white' : 'text.primary'
                                                    }}
                                                >
                                                    {msgUser.partnerName}
                                                </Typography>
                                            </Box>

                                        </Box>

                                    </CardActionArea>

                                    <Divider></Divider>

                                </Box>

                            ))

                            :

                            <Typography align='left' variant='p'>No contact's yet.</Typography>
                        }

                    </Card>

                    <Card sx={{ flex: 2, height: 600, minWidth: 300, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                alignContent: 'center',
                                p: 2,
                            }}
                        >

                            <Avatar
                                sx={{
                                    height: 64,
                                    width: 64
                                }}
                                alt="messagePartner"
                                src={
                                    userMessages[viewedMsgPartner].partnerAvatar ? VITE_IMAGE_URL + "/" + userMessages[viewedMsgPartner].partnerAvatar : null
                                }
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
                                flexDirection: 'column',
                            }}>
                                <Typography align='left' variant='h6'>
                                    {userMessages.length > 0 ? userMessages[viewedMsgPartner].partnerName : "--"}
                                </Typography>
                            </Box>

                        </Box>

                        <Divider></Divider>

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
                            {userMessages.length > 0 &&
                                userMessages[viewedMsgPartner].messages.map((message, index) => (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignSelf: user.uuid === message.senderId ? 'flex-end' : 'flex-start',
                                            backgroundColor: 'primary.main',
                                            width: '60%',
                                            p: 1,
                                            borderRadius: 1,
                                            flexDirection: 'column'
                                        }}
                                        key={index}
                                    >
                                        <Typography align='left' variant='p' color='text.white'>{message.content}</Typography>
                                        <Typography align='left' variant='p' color='text.white'>
                                            {format(new Date(message.createdAt), "MMMM d, HH:mm")}
                                        </Typography>

                                    </Box>
                                ))
                            }

                        </Box>



                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>

                            <FormControl sx={{ width: '100%' }}>
                                <TextField
                                    id="message-input"
                                    label="Message"
                                    variant="outlined"
                                    onChange={handleMessageWrite}

                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                onClick={handleMessageSend}
                            >
                                <SendIcon />
                            </Button>

                        </Box>

                    </Card>
                </Box>

                :

                <Typography variant='p'>You have no contacts or messages yet.</Typography>
            }
        </Box>

    )
}

export default Messages
