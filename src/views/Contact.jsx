import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';

function Contact () {

    const [count, setCount] = useState(0)


    return(
        <>
            <h1>Contact Page for DogWatch</h1>
            <h1>Contacting our dog loving community starts from here!</h1>
        </>
    )
}

export default Contact