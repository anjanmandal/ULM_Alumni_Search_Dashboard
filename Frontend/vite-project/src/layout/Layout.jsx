import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider, useMediaQuery } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme/theme';
import NavBar from './NavBar';
import SideDrawer from './SideDrawer';
import Footer from './Footer';

const drawerWidth = 240;

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true); // Drawer is open by default
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Toggle light/dark theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Toggle side drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen); // Toggle between open and collapsed
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        {/* NavBar Component */}
        <NavBar
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
        />

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {/* SideDrawer Component - Hide on mobile */}
          {!isMobile && (
            <SideDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
          )}

          {/* Main content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: isMobile ? '100%' : drawerOpen ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 60px)',
              transition: 'all 0.3s ease-in-out',
              minHeight: 'calc(100vh - 64px - 64px)', // Adjust for AppBar and Footer heights
            }}
          >
            <Toolbar /> {/* This is for spacing under the NavBar */}
            <Container>
              <Outlet /> {/* This will render the page content */}
            </Container>
          </Box>
        </Box>

        {/* Footer Component */}
        <Footer drawerOpen={drawerOpen} /> {/* Pass drawerOpen to control width like NavBar */}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
