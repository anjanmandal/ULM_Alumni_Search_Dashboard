// AboutPage.js
import React from 'react';
import { Grid, Box, Typography, Paper, Avatar, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

// Styling the Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: '800px',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

// Main About Page Component
const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', padding: theme.spacing(4) }}>
      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main }}>
        About Us
      </Typography>

      {/* Main content container */}
      <StyledPaper>
        {/* Responsive Grid */}
        <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
          {/* Profile Picture or Illustration */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                alt="Our Mission"
                src="./ulm-logo.png" // Change to your image
                sx={{
                  width: isMobile ? 120 : 200,
                  height: isMobile ? 120 : 200,
                  boxShadow: theme.shadows[4],
                }}
              />
            </Box>
          </Grid>

          {/* Textual Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="body1" paragraph>
              Welcome to AlumniConnect, your go-to platform for connecting and networking with fellow alumni from the
              University of Louisiana Monroe. Our mission is to bridge the gap between past and present, fostering a
              strong sense of community among ULM graduates.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're looking to reconnect with old classmates, attend events, or explore new job opportunities,
              our platform is designed to make the process easy, engaging, and rewarding. Join us and be part of a
              growing community that believes in the power of connections.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe that the bonds we create during our academic years can last a lifetime, and with AlumniConnect,
              we strive to keep those connections strong, vibrant, and meaningful. Stay connected. Stay inspired.
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Mission and Values Section */}
      <Box mt={6}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: theme.spacing(3), color: theme.palette.primary.main }}>
          Our Mission and Values
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: theme.spacing(3), textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Connection
              </Typography>
              <Typography variant="body1">
                We aim to foster meaningful connections among ULM alumni and help them stay engaged with the university
                and each other.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: theme.spacing(3), textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Growth
              </Typography>
              <Typography variant="body1">
                Through networking, events, and opportunities, we empower alumni to grow personally and professionally.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: theme.spacing(3), textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Legacy
              </Typography>
              <Typography variant="body1">
                By staying connected, we help alumni build a lasting legacy that contributes to the ongoing success of ULM.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutPage;
