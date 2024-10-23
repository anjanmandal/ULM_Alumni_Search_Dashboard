import React, { useEffect, useState } from 'react';
import { Box, Paper, Button, Typography, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobsEventsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false); // State to track if the user is an alumni

  // Fetch jobs, events, and user role when the component mounts
  useEffect(() => {
    const fetchJobsEventsAndUserRole = async () => {
      try {
        // Fetch jobs and events
        const jobsResponse = await axios.get('/api/jobs');
        const eventsResponse = await axios.get('/api/events');
        setJobs(jobsResponse.data);
        setEvents(eventsResponse.data);

        // Fetch user profile to determine the role
        const userProfileResponse = await axios.get('/api/user/profile', { withCredentials: true });
        setIsAlumni(userProfileResponse.data.role === 'alumni'); // Set if user is an alumni

        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs, events, or user role:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchJobsEventsAndUserRole();
  }, []);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography align="center" color="error">Failed to load jobs and events.</Typography>;

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
        Jobs and Events
      </Typography>

      {/* Conditionally show the buttons only if the user is an alumni */}
      {isAlumni && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/add-job"
            sx={{ textTransform: 'none' }}
          >
            Add Job
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/add-event"
            sx={{ textTransform: 'none' }}
          >
            Add Event
          </Button>
        </Box>
      )}

      {/* Display Jobs and Events in a Grid */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Available Jobs
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <ListItem key={job._id} sx={{ mb: 1 }}>
                    <ListItemText
                      primary={job.title}
                      secondary={`Company: ${job.company} - Location: ${job.location}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  No job postings available.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Upcoming Events
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {events.length > 0 ? (
                events.map((event) => (
                  <ListItem key={event._id} sx={{ mb: 1 }}>
                    <ListItemText
                      primary={event.title}
                      secondary={`Date: ${new Date(event.date).toLocaleDateString()} - Location: ${event.location}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  No upcoming events available.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobsEventsPage;
