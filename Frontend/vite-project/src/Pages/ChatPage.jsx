import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Avatar,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { styled, useTheme } from '@mui/system';

const socket = io('http://localhost:5000'); // Connect to the server

// Styled components similar to ConversationList
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2,
  maxWidth: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 600,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5.5),
  height: theme.spacing(5.5),
  marginRight: theme.spacing(2),
}));

const ChatPage = () => {
  const theme = useTheme();
  const { conversationId } = useParams(); // Get the conversation ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [recipientName, setRecipientName] = useState('Recipient Name');

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/user/profile', {
        withCredentials: true,
      });
      setCurrentUserId(response.data._id); // Store logged-in user ID
    };

    fetchProfile();
  }, []); // Remove unnecessary dependencies

  // Fetch messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`/api/chat/messages/${conversationId}`);
      setMessages(response.data.messages);
      setRecipientId(response.data.recipientId); // Store recipientId from backend
      setRecipientName(response.data.recipientName);
    };

    fetchMessages();

    // Join the chat room using conversationId
    socket.emit('join_room', { conversationId });

    // Listen for incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket event listener on unmount
    return () => {
      socket.off('receive_message');
    };
  }, [conversationId]); // Only depend on conv

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId,
      senderId: currentUserId,
      recipientId,
      content: newMessage,
    };

    // Emit the message to the server
    socket.emit('send_message', messageData);

    // Clear the input field
    setNewMessage('');
  };

  // Function to generate a background color for avatars based on name
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  };

  // Generate avatar initials based on name
  const stringAvatar = (name) => {
    if (!name) return;
    return {
      sx: {
        bgcolor: stringToColor(name),
        color: theme.palette.getContrastText(stringToColor(name)),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
    };
  };

  return (
    <StyledPaper elevation={3}>
      {/* Chat header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(2),
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderBottom: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
        }}
      >
        <StyledAvatar {...stringAvatar(recipientName)} />
        <Box ml={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {recipientName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Active now
          </Typography>
        </Box>
      </Box>

      {/* Message list */}
      <List
        sx={{
          flexGrow: 1,
          padding: theme.spacing(2),
          overflowY: 'scroll',
          backgroundColor: theme.palette.background.default,
          height: '50vh',
        }}
      >
        {messages.map((msg) => {
          const isCurrentUser = msg.sender && msg.sender._id && msg.sender._id === currentUserId;

          return (
            <ListItem
              key={msg._id}
              sx={{
                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: theme.spacing(2),
              }}
            >
              {/* Only show avatar for recipient's messages */}
              {!isCurrentUser && msg.sender && (
                <Avatar
                  {...stringAvatar(msg.sender.name)}
                  sx={{ marginRight: theme.spacing(2), alignSelf: 'flex-start' }}
                />
              )}

              {/* Message content */}
              <Box
                sx={{
                  padding: theme.spacing(1.5),
                  borderRadius: theme.shape.borderRadius * 2,
                  backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
                  color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
                  maxWidth: '60%',
                  textAlign: isCurrentUser ? 'right' : 'left',
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>

      {/* Message input */}
      <Box
        sx={{
          display: 'flex',
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
          sx={{ marginRight: theme.spacing(2), borderRadius: theme.shape.borderRadius }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          sx={{ borderRadius: theme.shape.borderRadius, padding: theme.spacing(1, 3) }}
        >
          Send
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default ChatPage;
