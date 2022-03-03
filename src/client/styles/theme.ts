import { createTheme } from '@material-ui/core/';
import { grey, lightBlue } from '@mui/material/colors';


export const theme = createTheme({
  palette: {
    primary: {
      light: grey[400],
      main: grey[900],
      dark: grey[800],
      contrastText: '#000'
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  shape: {
    borderRadius: 5
  },
  typography: {
    fontFamily: 'Inter',
    button: {
      textTransform: 'none'
    }
  }
});
