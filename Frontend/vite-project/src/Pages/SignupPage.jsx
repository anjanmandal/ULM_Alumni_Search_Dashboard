import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme, maroonTheme } from '../theme/theme'; // Import themes
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [graduationYear, setGraduationYear] = useState('');
  const [degree, setDegree] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Theme toggle state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      role,
      ...(role === 'alumni' && {
        graduationYear,
        degree,
        occupation,
        location,
        linkedinProfile,
      }),
    };

    try {
      const response = await axios.post('/api/auth/register', data);
      console.log(response.data);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.log('Error response:', err.response);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error occurred during signup. Try again.');
      }
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : maroonTheme}> {/* Apply the maroonTheme or darkTheme based on toggle */}
      <CssBaseline /> {/* Reset CSS */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Sign Up
            </Typography>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSignup}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} required>
                <MenuItem value="user">Student</MenuItem>
                <MenuItem value="alumni">Alumni</MenuItem>
              </Select>
            </FormControl>

            {role === 'alumni' && (
              <>
                <TextField
                  label="Graduation Year"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
                <TextField
                  label="Degree"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
                <TextField
                  label="Occupation"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                  label="LinkedIn Profile"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                />
              </>
            )}

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Box>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body1">
              Already have an account?{' '}
              <a href="/login" style={{ color: maroonTheme.palette.primary.main }}>Login</a>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="outlined" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignupPage;
