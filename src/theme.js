import { createMuiTheme } from '@material-ui/core';
import { accent } from './colors';

export default createMuiTheme({
  palette: {
    primary: { main: accent },
  },
  typography: {
    body1: {
      fontFamily: 'Nunito Sans',
    },
    button: {
      fontFamily: 'Nunito Sans',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'Kalam',
    },
    h3: {
      fontFamily: 'Montserrat',
      fontWeight: 800,
    },
    h4: {
      fontFamily: 'Ubuntu',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Ubuntu',
      fontWeight: 500,
    },
    body2: {
      fontFamily: 'Nunito Sans',
      fontWeight: 700,
    },
  },
});
