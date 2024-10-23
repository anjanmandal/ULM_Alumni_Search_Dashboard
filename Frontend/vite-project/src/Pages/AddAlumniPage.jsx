import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const AddAlumniPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: '',
    degree: '',
    occupation: '',
    location: '',
    linkedinProfile: '',
    mentorship: false,
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataObj = new FormData();
      formDataObj.append('profilePicture', profilePicture);

      // Append other form data
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      // Send request to the server
      const response = await axios.post('/api/alumni/add', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: 4, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#800000' }}>
        Add New Alumni
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField 
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Graduation Year */}
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth
              label="Graduation Year"
              variant="outlined"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>

          {/* Degree */}
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth
              label="Degree"
              variant="outlined"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Occupation */}
          <Grid item xs={12}>
            <TextField 
              fullWidth
              label="Occupation"
              variant="outlined"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField 
              fullWidth
              label="Location"
              variant="outlined"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* LinkedIn Profile */}
          <Grid item xs={12}>
            <TextField 
              fullWidth
              label="LinkedIn Profile"
              variant="outlined"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleChange}
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 2, mb: 1 }}
            >
              Upload Profile Picture
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {profilePicture && <Typography>{profilePicture.name}</Typography>}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button 
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#800000', '&:hover': { backgroundColor: '#9c2323' } }}
            >
              Add Alumni
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Alumni added successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          Error adding alumni. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddAlumniPage;
