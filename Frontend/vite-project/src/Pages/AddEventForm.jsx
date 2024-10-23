import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const AddEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState(''); // Add link state
  const [alumniId, setAlumniId] = useState(null); // State for alumniId fetched from backend
  const [successMessage, setSuccessMessage] = useState(false); // Snackbar state for success
  const [errorMessage, setErrorMessage] = useState(false); // Snackbar state for error
  const [loading, setLoading] = useState(false); // State for handling form submission loading

  // Fetch alumniId when the component is mounted
  useEffect(() => {
    const fetchAlumniId = async () => {
      try {
        const response = await axios.get('/api/user/alumni-profile', { withCredentials: true });
        console.log('Profile Response:', response.data);
        setAlumniId(response.data._id); // Assuming the alumniId is returned in the profile response
      } catch (error) {
        console.error('Error fetching alumni profile:', error);
        setErrorMessage(true); // Show error message if fetching fails
      }
    };

    fetchAlumniId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alumniId) {
      setErrorMessage(true); 
      console.log('Error: Alumni ID is missing.');
      return;
    }

    setLoading(true); // Set loading state when form is submitted
    try {
      const response = await axios.post('/api/events/add-event', {
        title,
        description,
        date,
        location,
        alumniId, // Ensure alumniId is correctly sent
        link, // Send link to backend
      },{ withCredentials: true });
      console.log('Event added successfully:', response.data);
      setSuccessMessage(true); // Show success message
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setLink('');
    } catch (error) {
      console.error('Error adding event:', error);
      setErrorMessage(true); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(false);
    setErrorMessage(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }} align="center">
        Add New Event
      </Typography>

      <TextField
        label="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Registration Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        disabled={loading} // Only disable the button when submitting the form
      >
        {loading ? 'Adding Event...' : 'Add Event'}
      </Button>

      {/* Snackbar for success */}
      <Snackbar open={successMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Event added successfully!
        </Alert>
      </Snackbar>

      {/* Snackbar for error */}
      <Snackbar open={errorMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error adding the event. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEventForm;
