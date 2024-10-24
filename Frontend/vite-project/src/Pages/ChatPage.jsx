import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, TextField, Button, Avatar, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { styled } from '@mui/system';

const socket = io('http://localhost:5000'); // Connect to the server

// Styled components similar to ConversationList
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: '15px',
  maxWidth: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 600,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 5px',
  },
}));

const StyledAvatar = styled(Avatar)({
  width: '45px',
  height: '45px',
  marginRight: '15px',
});

const ChatPage = () => {
  const { conversationId } = useParams();  // Get the conversation ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [recipientName, setRecipientName] = useState('Recipient Name');

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/user/profile', { withCredentials: true });
      setCurrentUserId(response.data._id); // Store logged-in user ID
    };
  
    fetchProfile();
  }, []); // Remove unnecessary dependencies
  
  // Fetch messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`/api/chat/messages/${conversationId}`);
      setMessages(response.data.messages);
      setRecipientId(response.data.recipientId);  // Store recipientId from backend
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

    // Add the message locally to messages state without waiting for the server response
    

    setNewMessage(''); // Clear the input field
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
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
    };
  };

  return (
    <StyledPaper elevation={3}>
      {/* Chat header */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
        <StyledAvatar {...stringAvatar(recipientName)} />
        <Box ml={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{recipientName}</Typography>
          <Typography variant="body2" color="textSecondary">Active now</Typography>
        </Box>
      </Box>

      {/* Message list */}
      <List sx={{ flexGrow: 1, padding: '20px', overflowY: 'scroll', backgroundColor: '#fff', height: '50vh' }}>
      {messages.map((msg) => {
  console.log('Sender:', msg.sender);
  
  // Ensure msg.sender and msg.sender._id exist before calling .toString()
  console.log('which is undefiend sender sender_id or current ',msg.sender,currentUserId)
  const isCurrentUser = msg.sender && msg.sender._id && msg.sender._id === currentUserId;
  


  return (
    <ListItem
      key={msg._id}
      sx={{
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '10px',
      }}
    >
      {/* Only show avatar for recipient's messages */}
      {!isCurrentUser && msg.sender && (
        <Avatar
          {...stringAvatar(msg.sender.name)}
          sx={{ marginRight: '10px', alignSelf: 'flex-start' }}
        />
      )}

      {/* Message content */}
      <Box
        sx={{
          padding: '10px',
          borderRadius: '15px',
          backgroundColor: isCurrentUser ? '#0084ff' : '#f1f0f0',
          color: isCurrentUser ? '#fff' : '#000',
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
      <Box sx={{ display: 'flex', padding: '10px', backgroundColor: 'theme.palette.background.paper', borderTop: '1px solid #ddd' }}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
          sx={{ marginRight: '10px', borderRadius: '50px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          sx={{ borderRadius: '50px', padding: '10px 20px' }}
        >
          Send
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default ChatPage;
