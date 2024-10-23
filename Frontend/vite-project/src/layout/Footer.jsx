import { AppBar, Toolbar, Typography,Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: '64px',  // Adjust height if needed
        backgroundColor: '#b71c1c',  // Example color
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1201, // Ensure it stays on top of other content
      }}
    >
      © 2024 Your Company Name. All Rights Reserved.
    </Box>
  );
};

export default Footer;
