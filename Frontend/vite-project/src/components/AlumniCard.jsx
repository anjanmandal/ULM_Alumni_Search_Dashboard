import { Paper, Typography, Box, Button } from '@mui/material';

const AlumniCard = ({ alumni, onStartConversation }) => {
  const userId = alumni.user ? alumni.user._id : null;
  console.log(alumni.user.profilePicture);

 


  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '100%', sm: '250px', md: '220px' },  // Responsive width for different screen sizes
        p: 2,
        borderRadius: 4,
        margin: 2,  // Ensure some margin around the card
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, width: '100%' }}>
        <Box
          component="img"
          src={alumni.user.profilePicture ? `http://localhost:5000${alumni.user.profilePicture}` : 'https://via.placeholder.com/150' }
          alt={`${alumni.name}'s profile picture`}
          sx={{
            width: 100,     // Set a fixed width for the image
            height: 100,    // Set a fixed height for the image
            borderRadius: '50%',
            border: '4px solid #f0f0f0',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover',  // Ensures image fits within the circular frame
          }}
        />
      </Box>

      <Box sx={{ padding: '10px 0', textAlign: 'center' }}>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          {alumni.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
          {alumni.occupation}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
          Class of {alumni.graduationYear}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {alumni.degree}
        </Typography>
      </Box>

      {userId && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: '#3498db',
            '&:hover': {
              backgroundColor: '#2980b9',
            },
          }}
          onClick={() => onStartConversation(userId)}
        >
          Chat
        </Button>
      )}
    </Paper>
  );
};

export default AlumniCard;
