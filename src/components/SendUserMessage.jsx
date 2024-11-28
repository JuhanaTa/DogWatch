import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageToUser, userMsgInit } from '../reducers/UserReducer';
import { SocketContext } from '../App';
import { getUserMessages } from '../requests/userRequests';

function SendUserMessage({ receiverId, receiverFirstName, receiverLastname, setSendMessageOpen }) {
    const { sendMessageToUserError } = useSelector((state) => state.data)
    const { user } = useSelector((state) => state.user)

    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    
    const token = localStorage.getItem('token');

    const [message, setMessage] = useState('');


    const handleMessage = (event) => {
        event.preventDefault();
        setMessage(event.target.value);
    };

    const handleMessageSend = () => {

        let data = {
            content: { content: message },
            receiverId: receiverId,//viewedProfile.uuid,
            token: token
        }

        dispatch(sendMessageToUser(data)).then(async(res) => {
            if(res.payload) {
                const messageSenders = await getUserMessages(token)
                dispatch(userMsgInit(messageSenders))

                setSendMessageOpen(false)
            }
        })

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