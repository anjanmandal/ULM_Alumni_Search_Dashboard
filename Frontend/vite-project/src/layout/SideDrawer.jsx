import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Box } from '@mui/material';
import { Home, People, Info, Chat, ListAlt } from '@mui/icons-material'; 
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

const SideDrawer = ({ open, toggleDrawer }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'} 
        open={open} 
        onClose={toggleDrawer} 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ minHeight: '64px' }} />

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '0',
            flexDirection: 'column',
          }}
        >
          <img 
            src="/ulm-logo.png"  
            alt="ULM Logo"
            style={{ 
              width: '120px', 
              height: 'auto', 
            }}
          />
        </Box>

        <Divider sx={{ marginBottom: 0 }} />

        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon><ListAlt /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/alumni">
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Alumni" />
          </ListItem>
          <ListItem button component={Link} to="/conversations">
            <ListItemIcon><Chat /></ListItemIcon>
            <ListItemText primary="Conversations" />
          </ListItem>
          <ListItem button component={Link} to="/jobs-events">
            <ListItemIcon><ListAlt /></ListItemIcon>
            <ListItemText primary="Jobs & Events" />
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemIcon><Info /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SideDrawer;
