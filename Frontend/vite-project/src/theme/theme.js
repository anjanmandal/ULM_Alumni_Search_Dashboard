import { createTheme } from '@mui/material/styles';

// Define custom maroon theme for light and dark mode
const maroonTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#800000', // Maroon
    },
    secondary: {
      main: '#ffc107', // Complementary golden tone
    },
    background: {
      default: '#f5f5f5', // Light background color
      paper: '#ffffff',   // Paper component background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem', // Advanced typography
      fontWeight: 600,
      color: '#800000',   // Maroon for headers
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Keep buttons text normal case
          fontWeight: 'bold',
          borderRadius: 8,       // Slightly rounded corners
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', // Advanced shadow effect
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#800000', // Maroon
    },
    secondary: {
      main: '#ffc107', // Complementary golden tone
    },
    background: {
      default: '#f5f5f5', // Light background color
      paper: '#ffffff',   // Paper component background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem', // Advanced typography
      fontWeight: 600,
      color: '#800000',   // Maroon for headers
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Keep buttons text normal case
          fontWeight: 'bold',
          borderRadius: 8,       // Slightly rounded corners
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', // Advanced shadow effect
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#800000', // Maroon in dark mode
    },
    secondary: {
      main: '#ffc107', // Golden in dark mode
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e',   // Paper component background for cards
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#ffc107',   // Golden for headers in dark mode
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      color: '#ccc',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: 8,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
        },
      },
    },
  },
});

export { maroonTheme, lightTheme, darkTheme };
