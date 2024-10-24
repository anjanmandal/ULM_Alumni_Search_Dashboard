import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  Button,
  Avatar,
  Box,
  useMediaQuery,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Logout,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const drawerWidth = 240;

const NavBar = ({ darkMode, toggleTheme, drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [user, setUser] = useState({
    name: '',
    profilePicture: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          withCredentials: true,
        });
        setUser({
          name: response.data.name,
          profilePicture: response.data.profilePicture
            ? `http://localhost:5000${response.data.profilePicture}`
            : 'https://via.placeholder.com/40',
        });
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: isMobile ? '100%' : drawerOpen ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 60px)',
        transition: 'width 0.3s ease, margin-left 0.3s ease',
      }}
    >
      <Toolbar>
        {/* Menu Icon for mobile screens */}
        <IconButton
          color="inherit"
          edge="start"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} // Only show on mobile (xs)
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Alumni Search
        </Typography>

        {/* Dark Mode Toggle */}
        <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 2 }}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Switch checked={darkMode} onChange={toggleTheme} />

        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Avatar
            src={user.profilePicture}
            alt={user.name}
            sx={{ width: 40, height: 40, mr: 1 }}
          />
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user.name}
          </Typography>
        </Box>

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
