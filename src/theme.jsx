import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#115779', // Custom primary color
      },
      secondary: {
        main: '#FFFFFF', // Custom secondary color
      },

      text: {
        primary: "#000000",
        highlight: '#D99528',
        white: '#FFFFFF'
      },

      notice: '#D99528'

      //Define here custom colors to other elements e.g. error, warning success etc. if needed
    },
  });

  export default theme