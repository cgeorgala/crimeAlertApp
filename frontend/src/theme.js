import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#04533D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0A6E55',
      contrastText: '#ffffff',
    },
  },
  components: {
    // Customize the Button component
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // Remove uppercase by default
        },
        containedPrimary: {
          backgroundColor: '#04533D',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#03332a', // Slightly darker for hover
          },
        },
        containedSecondary: {
          backgroundColor: '#0A6E55',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#074936', // Slightly darker for hover
          },
        },
      },
    },
    // Customize CircularProgress color
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: '#04533D',
        },
        colorSecondary: {
          color: '#0A6E55',
        },
      },
    },
  },
});