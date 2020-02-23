import { createMuiTheme } from '@material-ui/core/styles';
import {
  red,
  grey,
  indigo,
  orange,
  green,
  blue
} from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
      dark: '#071e3d'
    },
    secondary: {
      main: red[500]
    },
    error: {
      main: red[900]
    },
    warning: {
      main: orange[600]
    },
    success: {
      main: green[500]
    },
    info: {
      main: blue[500]
    },
    background: {
      default: grey[100]
    },
    text: {
      primary: grey[800]
    }
  },
  typography: {
    fontFamily: [
      'Amar Bangla',
      'SutonnyMJ',
      'Roboto',
      'SutonnyOMJ',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    h1: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      color: grey[900]
    },
    h2: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      color: grey[900]
    },
    h3: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      color: grey[900]
    },
    h4: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      color: grey[900]
    },
    h6: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      color: grey[900]
    },
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      color: grey[900]
    }
  }
});

export default theme;
