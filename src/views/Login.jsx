import { useState } from 'react'
import cover from '../assets/dog4.jpg'
import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

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