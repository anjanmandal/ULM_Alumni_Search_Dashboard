import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Paper, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { maroonTheme } from '../theme/theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Loading state for checking if already logged in
  const [isLoggingIn, setIsLoggingIn] = useState(false);  // Loading state for login process
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.post('/api/auth/login', { withCredentials: true });
        navigate('/dashboard');  // Redirect if already authenticated
      } catch (err) {
        // Not authenticated, so allow login form to be shown
      }
      setLoading(false);  // Stop showing loading spinner after check
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    setIsLoggingIn(true); // Show loading spinner on login button

    try {
      const response = await axios.post('/api/auth/login', { email, password, rememberMe }, { withCredentials: true });
      console.log(response.data);
      navigate('/');  // Redirect after successful login
    } catch (err) {
      // Handle different error types (e.g., network error, validation error)
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ThemeProvider theme={maroonTheme}>
      <Container
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: '8px' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Login
            </Typography>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleLogin}>
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
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember Me"
            />
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoggingIn}
                sx={{
                  height: '50px',
                  borderRadius: '25px',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                  textTransform: 'none',
                }}
              >
                {isLoggingIn ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Box>
          </form>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body1">
              Do not have an account?{' '}
              <a href="/signup" style={{ color: maroonTheme.palette.primary.main }}>
                Sign Up
              </a>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
