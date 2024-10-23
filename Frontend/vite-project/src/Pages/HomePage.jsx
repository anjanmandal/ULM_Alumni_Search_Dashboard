import React from 'react';
import { Container, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import { People, Event, Chat, AddBox, Work } from '@mui/icons-material'; // Import icons
import { maroonTheme } from '../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Alumni Directory',
    description: 'Connect with alumni from various fields and find their contact details.',
    icon: <People fontSize="large" color="primary" />,
    route: '/alumni',
  },
  {
    title: 'Chat with Alumni',
    description: 'Start a conversation and network with fellow alumni through our chat feature.',
    icon: <Chat fontSize="large" color="primary" />,
    route: '/conversations',
  },
  {
    title: 'Events',
    description: 'Stay updated on the latest events, workshops, and seminars organized by the alumni network.',
    icon: <Event fontSize="large" color="primary" />,
    route: '/jobs-events',
  },
  {
    title: 'Jobs',
    description: 'Browse and apply for job opportunities posted by the alumni network.',
    icon: <Work fontSize="large" color="primary" />,
    route: '/jobs-events',  // Assuming job postings are on the same page as events
  },
  {
    title: 'Add Job/Event',
    description: 'Post a new job or event to the alumni network and manage existing listings.',
    icon: <AddBox fontSize="large" color="primary" />,
    route: '/add-job', // This can lead to either a job or event posting form
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route); // Navigate to the route when an icon is clicked
  };

  return (
    <ThemeProvider theme={maroonTheme}>
      <Container sx={{ mt: 6 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" color="primary" gutterBottom>
            Welcome to the Alumni Network
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Stay connected, network, and participate in alumni events through this platform.
          </Typography>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <IconButton
                  size="large"
                  color="primary"
                  sx={{
                    backgroundColor: maroonTheme.palette.secondary.main,
                    '&:hover': { backgroundColor: maroonTheme.palette.primary.main },
                    mb: 2,
                  }}
                  onClick={() => handleNavigation(feature.route)}
                >
                  {feature.icon}
                </IconButton>
                <Typography variant="h5" color="primary" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Additional Info */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" color="primary">
            Why Join Us?
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
            By joining our alumni platform, you gain access to a vast network of professionals, exclusive job postings, events, and the ability to stay connected with the university community. Enhance your career opportunities and personal growth by staying connected with your peers.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
