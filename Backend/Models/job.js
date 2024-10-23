const mongoose = require('mongoose');

const jobPostingSchema = mongoose.Schema({
  title: { type: String, required: true },
  company: String, // Company offering the job
  description: String, // Job description
  alumni: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // Alumni who posted the job
  location: String, // Job location
  datePosted: { type: Date, default: Date.now },
  link: { type: String }, // Link to the job application
}, { timestamps: true });

// Model Name: JobPosting
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
