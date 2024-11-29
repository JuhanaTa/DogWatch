import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageToUser, userMsgInit } from '../reducers/UserReducer';
import { getUserMessages } from '../requests/userRequests';

function SendUserMessage({ receiverId, receiverFirstName, receiverLastname, setSendMessageOpen }) {
    const { sendMessageToUserError } = useSelector((state) => state.data)

    const dispatch = useDispatch();
    
    const token = localStorage.getItem('token');

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});


    const handleMessage = (event) => {
        event.preventDefault();
        setMessage(event.target.value);
    };

    const handleMessageSend = () => {

        if(validate()){

            let data = {
                content: { content: message },
                receiverId: receiverId,//viewedProfile.uuid,
                token: token
            }
    
            dispatch(sendMessageToUser(data)).then(async(res) => {
                if(res.payload) {
                    try {
                        const messageSenders = await getUserMessages(token)
                        dispatch(userMsgInit(messageSenders))
                        setSendMessageOpen(false)
                    } catch (error) {
                        console.log('Message sent, but update failed.')
                    }
                }
            })

        }

    }

    const validate = () => {
        const allErrors = {};

        if (!message.trim()) {
            allErrors.message = 'Message is required';
        }

        setErrors(allErrors)

        return Object.keys(allErrors).length === 0;
    }

    return (

        <Box sx={{ backgroundColor: 'secondary.main', gap: 2, display: 'flex', flexDirection: 'column' }}>

            <Box>
                <Typography align='left' variant="h6" sx={{ color: 'text.primary' }}>Send a message</Typography>
                <Typography align='left' variant="p" sx={{ color: 'text.primary' }}>To: {receiverFirstName} {receiverLastname}</Typography>
            </Box>

            <FormControl sx={{ width: '40vw', maxWidth: 500, minWidth: 225, }}>
                <TextField
                    id="message-input"
                    label="Message"
                    variant="outlined"
                    value={message}
                    onChange={handleMessage}
                    error={!!errors.message}
                    helperText={errors.message}
                />
            </FormControl>

            <Button
                onClick={handleMessageSend}
                variant="contained"
                endIcon={<SendIcon />}
                sx={{width: 175, alignSelf: 'center'}}
            >
                Send message
            </Button>

            {sendMessageToUserError &&
                <Typography variant='p' color='error'>{sendMessageToUserError}</Typography>
            }

        </Box>

    )
}

export default SendUserMessage