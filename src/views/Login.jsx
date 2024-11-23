import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import cover from '../assets/dog4.jpg'
import { Box, Button } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [showRegister, setShowRegister] = useState(false)

    return (

        <Box sx={{
            backgroundImage: `url(${cover})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: '87.5vh',
            backgroundPosition: "center",
            display: 'block',
            width: '100%'
        }}>

            {showRegister ? <RegisterForm setShowRegister={setShowRegister}/> : <LoginForm setShowRegister={setShowRegister}/>}

        </Box>

    )
}

export default Login