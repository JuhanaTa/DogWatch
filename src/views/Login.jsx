import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import cover from '../assets/backgroundLogin.svg'
import { Box, Button } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Login() {

    const [showRegister, setShowRegister] = useState(false)

    const handleForm = (state) => {
        setShowRegister(state)
    }

    return (

        <Box sx={{
            backgroundImage: `url(${cover})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: '80vh',
            backgroundPosition: "center",
            display: 'block',
            width: '100%'
        }}>

            {showRegister ? <RegisterForm setShowRegister={setShowRegister}/> : <LoginForm setShowRegister={setShowRegister}/>}

        </Box>

    )
}

export default Login

/*
        <>
            <h1>Login Page for DogWatch</h1>
            <h1>Our dog loving community starts from here!</h1>
            <div className="card">
            <Button onClick={() => setCount((count) => count + 1)} variant="contained">
                count is {count}
            </Button>
            </div>
        </>
*/