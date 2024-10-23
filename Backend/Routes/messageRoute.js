const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware'); // Add your authentication middleware here
const {
  getConversations,
  getMessages,
  startConversation,
  getConversationsWithLastMessage
} = require('../Controllers/messageController');


// Get all conversations for the logged-in user

// Get all conversations for the logged-in user
router.get('/conversations', protect, getConversations);

// Get messages in a specific conversation
router.get('/messages/:conversationId', protect, getMessages);

// Start a new conversation
router.post('/start-conversation', protect, startConversation);
router.get('/conversations-with-last-message',protect,getConversationsWithLastMessage)
  
module.exports = router;
