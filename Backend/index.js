const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./Database/connect'); 
const alumniRoutes = require('./Routes/alumniRoutes');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/messageRoute'); 
const eventRoutes = require('./Routes/eventRoutes');
const jobPostingRoutes = require('./Routes/jobRoutes');
const mongoose = require('mongoose');
const Message = require('./Models/Message');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

connectDB();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());

// Routes
app.use('/api/alumni', alumniRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', messageRoutes);  
app.use('/api/events', eventRoutes);
app.use('/api/jobs', jobPostingRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join chat room based on conversation ID
  socket.on('join_room', ({ conversationId }) => {
    if (mongoose.Types.ObjectId.isValid(conversationId)) {
      socket.join(conversationId);
      console.log(`User with ID: ${socket.id} joined conversation room: ${conversationId}`);
    } else {
      console.log('Invalid conversation ID');
    }
  });
  
  // Send message
  socket.on('send_message', async (data) => {
    console.log('New message data:-----------------------------', data);
    const { conversationId, senderId, recipientId, content } = data;
    console.log('Sender:', senderId, 'Recipient:', recipientId, 'Content:', content);

    // Validate ObjectIds before proceeding
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recipientId) || !mongoose.Types.ObjectId.isValid(conversationId)) {
      console.log('Invalid sender, recipient, or conversation ID');
      return;
    }

    try {
    
      const newMessage = new Message({
        sender: senderId,
        recipient: recipientId,
        content,
        conversation: conversationId 
      });
      await newMessage.save();

    
      io.to(conversationId).emit('receive_message', newMessage);
      io.to(recipientId).emit('new_message_notification', { conversationId });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
