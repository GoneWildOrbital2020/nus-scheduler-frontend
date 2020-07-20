import { createMuiTheme } from '@material-ui/core';
import { accent, medium } from './colors';
import background from './images/bg.svg';

export const theme = createMuiTheme({
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
  overrides: {
    MuiScopedCssBaseline: {
      root: {
        backgroundImage: `url(${background})`,
        backgroundColor: medium,
      },
    },
  },
});

export const themeLandingPage = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      l: 1620,
      xl: 1920,
    },
  },
  palette: {
    primary: { main: accent },
  },
  typography: {
    body1: {
      fontFamily: 'Ubuntu',
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
  overrides: {
    MuiScopedCssBaseline: {
      root: {
        backgroundColor: medium,
      },
    },
  },
});
