const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // Recipient of the notification
  content: { type: String, required: true }, // Notification content
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

// Model Name: Notification
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
