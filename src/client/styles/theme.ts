import { createTheme } from '@material-ui/core/';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#78909c',
      main: '#455a64',
      dark: '#263238',
      contrastText: '#000',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: 'Inter',
    button: {
      textTransform: 'none',
    },
  },
});
