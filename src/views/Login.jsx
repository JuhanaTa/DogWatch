import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';

function Login () {

    const [count, setCount] = useState(0)


    return(
        <>
            <h1>Login Page for DogWatch</h1>
            <h1>Our dog loving community starts from here!</h1>
            <div className="card">
            <Button onClick={() => setCount((count) => count + 1)} variant="contained">
                count is {count}
            </Button>
            </div>
        </>
    )
}

export default Login