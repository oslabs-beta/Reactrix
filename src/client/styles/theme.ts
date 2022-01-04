import { createTheme } from '@material-ui/core/';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#CC4125',
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
  },
});
