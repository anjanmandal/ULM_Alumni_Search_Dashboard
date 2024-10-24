// AlumniCard.js
import { Paper, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AlumniCard = ({ alumni, currentUserId, onStartConversation }) => {
  const theme = useTheme();

  const userId = alumni.user ? alumni.user._id : null;

  // Determine whether to show the chat option
  const showChatOption = userId && userId !== currentUserId;

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '100%', sm: '250px', md: '220px' },  // Responsive width for different screen sizes
        p: theme.spacing(2),
        borderRadius: theme.shape.borderRadius * 2,
        margin: theme.spacing(2),
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: theme.spacing(2),
          width: '100%',
        }}
      >
        <Box
          component="img"
          src={
            alumni.user && alumni.user.profilePicture
              ? `http://localhost:5000${alumni.user.profilePicture}`
              : 'https://via.placeholder.com/150'
          }
          alt={`${alumni.name}'s profile picture`}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
            boxShadow: theme.shadows[3],
            objectFit: 'cover',
          }}
        />
      </Box>

      <Box sx={{ padding: theme.spacing(1, 0), textAlign: 'center' }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
        >
          {alumni.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, mb: theme.spacing(1) }}
        >
          {alumni.occupation}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontStyle: 'italic', mb: theme.spacing(1) }}
        >
          Class of {alumni.graduationYear}
        </Typography>
        <Typography variant="body2" sx={{ mb: theme.spacing(2) }}>
          {alumni.degree}
        </Typography>
      </Box>

      {/* Conditionally render the Chat button based on showChatOption */}
      {showChatOption && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
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
