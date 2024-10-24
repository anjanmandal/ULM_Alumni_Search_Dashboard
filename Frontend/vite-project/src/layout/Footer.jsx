// Footer.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: theme.spacing(8), // Adjust height if needed
        backgroundColor: theme.palette.primary.main, // Use theme's primary color
        color: theme.palette.primary.contrastText,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: theme.zIndex.appBar, // Ensure it stays on top of other content
      }}
    >
      <Typography variant="body1" sx={{ color: 'inherit' }}>
        © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
