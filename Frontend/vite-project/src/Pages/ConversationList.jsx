import React, { useState, useEffect } from 'react';
import { List, ListItem, Avatar, ListItemText, Box, Badge, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { styled } from '@mui/system';

const socket = io('https://ulm-alumni-search-dashboard-3.onrender.com'); // Connect to the server

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '10px',
  marginBottom: '8px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: '15px',
  maxWidth: 360,
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: '10px 5px',
  },
}));

const StyledAvatar = styled(Avatar)({
  width: '45px',
  height: '45px',
  marginRight: '15px',
});

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [notifications, setNotifications] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null); // Store logged-in user's ID
  const navigate = useNavigate();

  // Fetch current user profile and conversations on component mount
  useEffect(() => {
    const fetchProfileAndConversations = async () => {
      try {
        // Fetch current user profile
        const profileResponse = await axios.get('/api/user/profile', { withCredentials: true });
        const userId = profileResponse.data._id;
        setCurrentUserId(userId);

        // Fetch conversations with last message
        const conversationResponse = await axios.get('/api/chat/conversations-with-last-message');
        setConversations(conversationResponse.data);

        // Join user-specific socket room for notifications
        socket.emit('join_room', { conversationId: userId });

        // Listen for new message notifications
        socket.on('new_message_notification', (data) => {
          const { conversationId } = data;

          // Update notifications count for the specific conversation
          setNotifications((prevNotifications) => ({
            ...prevNotifications,
            [conversationId]: (prevNotifications[conversationId] || 0) + 1,
          }));
        });
      } catch (err) {
        console.error('Error fetching profile and conversations:', err);
      }
    };

    fetchProfileAndConversations();

    return () => {
      socket.off('new_message_notification');
    };
  }, []);

  // When a conversation is clicked, navigate to the chat page for that conversation
  const openChat = (conversationId) => {
    // Reset the notification count for the conversation
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [conversationId]: 0,
    }));

    navigate(`/chat/${conversationId}`);
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Conversations
      </Typography>
      <List>
        {conversations.map((conversation) => {
          // Exclude the current user from the participants to get the other user
          const otherParticipant = conversation.participants.find(
            (participant) => participant._id !== currentUserId
          );

          return (
            <StyledListItem key={conversation._id} onClick={() => openChat(conversation._id)}>
              <StyledAvatar src={otherParticipant?.profilePicture || 'default-avatar.png'} />
              <ListItemText
                primary={otherParticipant?.name || 'Unknown User'}
                secondary={conversation.lastMessage ? conversation.lastMessage.content : 'No messages yet'}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
              {notifications[conversation._id] > 0 && (
                <Badge badgeContent={notifications[conversation._id]} color="secondary" sx={{ ml: 2 }} />
              )}
            </StyledListItem>
          );
        })}
      </List>
    </StyledPaper>
  );
};

export default ConversationList;
