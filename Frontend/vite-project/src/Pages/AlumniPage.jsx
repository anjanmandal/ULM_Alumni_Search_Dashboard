// AlumniPage.js
import { useEffect, useState } from 'react';
import { Grid, Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import AlumniCard from '../components/AlumniCard';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile', { withCredentials: true });
        console.log(response.data);
        setCurrentUserId(response.data._id);
        setLoading(false); // Moved setLoading here to wait for currentUserId
      } catch (err) {
        console.error('Error fetching profile:', err);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  // Fetch all alumni data
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get('/api/alumni', { withCredentials: true });
        console.log(response.data);
        setAlumni(response.data);
        // Do not set loading to false here; wait until currentUserId is fetched
      } catch (err) {
        console.error('Error fetching alumni:', err);
        setError('Error fetching alumni data');
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  // Handle search functionality
  const handleSearch = async (field, searchTerm) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/alumni/search?field=${field}&term=${searchTerm}`,
        { withCredentials: true }
      );
      setAlumni(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error searching alumni:', err);
      setError('Error searching alumni data');
      setLoading(false);
    }
  };

  // Start a conversation
  const handleStartConversation = async (recipientId) => {
    try {
      const response = await axios.post(
        '/api/chat/start-conversation',
        {
          recipientId,
        },
        { withCredentials: true }
      );

      const { conversationId } = response.data;
      navigate(`/chat/${conversationId}`);
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError('Error starting conversation');
    }
  };

  if (loading || currentUserId === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, width: '100%', maxWidth: '1200px', mx: 'auto' }}>
      {/* SearchBar placed at the top */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>

      {/* Alumni Directory title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Alumni Directory
      </Typography>

      {/* Grid layout for alumni cards */}
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {alumni.length > 0 ? (
          alumni.map((person) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={person._id}>
              <AlumniCard
                alumni={person}
                currentUserId={currentUserId}
                onStartConversation={handleStartConversation}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No results found
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AlumniPage;
