import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme/theme';
import NavBar from './NavBar';
import SideDrawer from './SideDrawer';
import Footer from './Footer';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true); // Drawer is open by default

  // Toggle light/dark theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Toggle side drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen); // Toggle between open and collapsed
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        {/* NavBar Component */}
        <NavBar darkMode={darkMode} toggleTheme={toggleTheme} drawerOpen={drawerOpen} />
        
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {/* SideDrawer Component */}
          <SideDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

          {/* Main content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,  // Adjust the padding for better appearance
              width: drawerOpen ? 'calc(100% - 240px)' : 'calc(100% - 60px)',  // Adjust width based on drawer state
              transition: 'all 0.3s ease-in-out',  // Smooth transition for drawer and width
              minHeight: '100vh',
             
            }}
          >
            <Toolbar />
            <Container>
              <Outlet />  {/* This will render the page content */}
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
