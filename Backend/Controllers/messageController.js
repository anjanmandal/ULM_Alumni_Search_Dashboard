// controllers/conversationController.js

const Conversation = require('../Models/Conversation');
const Message = require('../Models/Message');
const User = require('../Models/User');
const mongoose=require('mongoose')
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all conversations for the logged-in user
exports.getConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'name profilePicture');  // Populate participants' details
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching conversations' });
  }
};

// Get messages in a specific conversation
exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  console.log(conversationId);

  try {
    // Fetch the conversation with populated participants
    const conversation = await Conversation.findById(conversationId)
      .populate('participants', 'name profilePicture'); // Populate participants' name and profile picture

    console.log(conversation);

    // Fetch all messages in the conversation and populate sender details (including name)
    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'name profilePicture'); // Populate sender's name and profile picture
      console.log(messages);

    // Find the recipient who is not the current user
    const recipient = conversation.participants.find(p => p._id.toString() !== req.user._id.toString());
    
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    console.log(recipient);

    // Send the messages along with the recipient's ID and name
    res.json({
      messages,
      recipientId: recipient._id,
      recipientName: recipient.name,  // Include recipient's name in the response
      recipientProfilePicture: recipient.profilePicture, // Include recipient's profile picture (optional)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};


// Start a new conversation between two users
exports.startConversation = async (req, res) => {
    const senderId = req.user._id; // The logged-in user's ID
    console.log('sender id',senderId)
    const { recipientId } = req.body;
    console.log('recepient id',recipientId)
    if (mongoose.Types.ObjectId.isValid(senderId) && mongoose.Types.ObjectId.isValid(recipientId)) {
        // Proceed with logic here
        console.log('Both IDs are valid');
      } else {
        console.log('Invalid sender or recipient ID');
      }
  
    try {
      // Check if a conversation already exists
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recipientId] }
      });
  
      // If no conversation exists, create a new one
      if (!conversation) {
        conversation = new Conversation({
          participants: [senderId, recipientId],
        });
        await conversation.save();
      }
  
      res.status(200).json({ conversationId: conversation._id });
    } catch (err) {
      console.error('Error starting conversation:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getConversationsWithLastMessage = async (req, res) => {
    const userId = req.user._id;
  
    try {
      // Find all conversations for the user
      const conversations = await Conversation.find({ participants: userId }).populate('participants');
  
      // For each conversation, fetch the last message (if it exists)
      const conversationsWithLastMessage = await Promise.all(
        conversations.map(async (conversation) => {
          // Fetch the last message in this conversation, sorted by the creation date
          const lastMessage = await Message.findOne({ conversation: conversation._id })
            .sort({ createdAt: -1 }) // Sort messages by creation date (most recent first)
            .limit(1); // Only return the latest message
  
          return {
            ...conversation.toObject(),
            lastMessage: lastMessage || null, // Include last message (if exists)
          };
        })
      );
  
      res.status(200).json(conversationsWithLastMessage);
    } catch (err) {
      console.error('Error fetching conversations with last message:', err);
      res.status(500).json({ message: 'Server error fetching conversations' });
    }
  };