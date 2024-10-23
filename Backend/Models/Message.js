const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },  // Reference to conversation
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Sender's ID
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Recipient's ID
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
