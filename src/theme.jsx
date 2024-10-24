import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#115779', // Custom primary color
      },
      secondary: {
        main: '#FFFFFF', // Custom secondary color
      },
    },
  });

  export default theme