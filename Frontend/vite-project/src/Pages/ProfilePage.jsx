import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Avatar, Paper, Grid, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: '15px',
  maxWidth: 600,
  margin: '0 auto',
}));

const ProfilePage = () => {
 
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: '',
    role: '', // User role (admin, user, alumni)
  });
  const [alumni, setAlumni] = useState(null); // Alumni-specific data
  const [editing, setEditing] = useState(false); // Editing state
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicName, setProfilePicName] = useState(''); // State for profile picture file name
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar type ('success' or 'error')

  // Fetch user and alumni data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile', { withCredentials: true });
        const { alumni, ...userData } = response.data; // Separate user and alumni data
        
        console.log(userData)
        console.log(alumni)
        setUser(userData);
        setAlumni(alumni); // Only set alumni data if the user is an alumni
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUserData();
  }, []);

  // Handle input change for user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input change for alumni data
  const handleAlumniInputChange = (e) => {
    const { name, value } = e.target;
    setAlumni((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicName(file.name); // Update file name
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', user.name);
    if (profilePic) {
      formData.append('profilePicture', profilePic);
    }

    // If the user is an alumni, append alumni-specific data
    if (user.role === 'alumni' && alumni) {
      formData.append('graduationYear', alumni.graduationYear);
      formData.append('occupation', alumni.occupation);
      formData.append('degree', alumni.degree);
    }

    try {
      await axios.put('/api/user/profile', formData, { withCredentials: true });
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setEditing(false); // Exit editing mode only after successful save
    } catch (err) {
      console.error('Error updating profile:', err);
      setSnackbarMessage('Error updating profile');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true); // Show snackbar
    }
  };

  // Allow editing and clear any previous messages
  const handleEditClick = () => {
    setEditing(true);
    setSnackbarMessage(''); // Clear any previous confirmation messages
  };

  // Handle cancel without prompt
  const handleCancel = () => {
    setEditing(false); // Exit editing mode
    setSnackbarMessage(''); // Clear any messages on cancel
  };

  // Close the Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <StyledPaper>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Profile picture section */}
          <Avatar
            src={user.profilePicture ? `https://ulm-alumni-search-dashboard-3.onrender.com${user.profilePicture}` : 'https://via.placeholder.com/150'}
            alt={user.name}
            sx={{ width: 120, height: 120, marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input type="file" hidden onChange={handleProfilePicChange} />
          </Button>
          {profilePicName && ( // Display file name when selected
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {profilePicName}
            </Typography>
          )}
        </Box>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          {/* Name field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={!editing} // Editable once editing is enabled
            />
          </Grid>

          {/* Email field (non-editable) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              disabled // Cannot edit email
            />
          </Grid>

          {/* Alumni-only fields */}
          {user.role === 'alumni' && alumni && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Graduation Year"
                  name="graduationYear"
                  value={alumni.graduationYear}
                  onChange={handleAlumniInputChange}
                  disabled={!editing} // Editable once editing is enabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={alumni.occupation}
                  onChange={handleAlumniInputChange}
                  disabled={!editing} // Editable once editing is enabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Degree"
                  name="degree"
                  value={alumni.degree}
                  onChange={handleAlumniInputChange}
                  disabled={!editing} // Editable once editing is enabled
                />
              </Grid>
            </>
          )}
        </Grid>

        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleEditClick}>
            Edit Profile
          </Button>
          <Button variant="contained" type="submit" sx={{ ml: 2 }}>
            Save
          </Button>
        </Box>

        {/* Snackbar for success and error messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Snackbar will close automatically after 6 seconds
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </StyledPaper>
  );
};

export default ProfilePage;
