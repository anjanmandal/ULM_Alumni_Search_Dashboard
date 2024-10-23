import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJobPostingForm = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [alumniId, setAlumniId] = useState(null); // Fetch alumniId from backend
  const [role, setRole] = useState(''); // User role
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch alumniId and role from user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/alumni-profile', { withCredentials: true });
        console.log(response);
        setAlumniId(response.data._id); // Assuming the alumniId is returned in the profile response
        setRole(response.data.role); // Fetch the user's role
      } catch (error) {
        console.error('Error fetching alumni profile:', error);
        setErrorMessage(true); // Show error message if fetching fails
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    console.log(alumniId)
    e.preventDefault();
    if (!alumniId) {
      setErrorMessage(true); // Show error if alumniId is not available or the role is not alumni
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/jobs/add-job', {
        title,
        company,
        description,
        location,
        alumniId, // Send alumniId along with form data
        link,
      });
      console.log('Job posting added:', response.data);
      setSuccessMessage(true);
      setTitle('');
      setCompany('');
      setDescription('');
      setLocation('');
      setLink('');
    } catch (error) {
      console.error('Error adding job posting:', error);
      setErrorMessage(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessMessage(false);
    setErrorMessage(false);
  };

  // Redirect non-alumni users to home page or login
  useEffect(() => {
    if (role && role !== 'alumni') {
      navigate('/'); // Redirect non-alumni users to home page or any other page
    }
  }, [role, navigate]);

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
        Add New Job Posting
      </Typography>

      <TextField
        label="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
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
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Job Application Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
      />

      <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
        {loading ? 'Adding Job...' : 'Add Job Posting'}
      </Button>

      {/* Snackbar for success */}
      <Snackbar open={successMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Job posting added successfully!
        </Alert>
      </Snackbar>

      {/* Snackbar for error */}
      <Snackbar open={errorMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error adding the job posting. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddJobPostingForm;
