const mongoose = require('mongoose');

const adminActionLogSchema = mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // Admin performing the action
  action: { type: String, required: true }, // Action performed (create, update, delete)
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the affected entity
  entityType: { type: String, required: true }, // Entity type (Alumni, Event, etc.)
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

// Model Name: AdminActionLog
const AdminActionLog = mongoose.model('AdminActionLog', adminActionLogSchema);

module.exports = AdminActionLog;
