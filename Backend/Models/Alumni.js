const mongoose = require('mongoose');

// Define the Alumni schema with user reference and additional fields
const alumniSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  graduationYear: { 
    type: Number, 
    required: true 
  },
  degree: { 
    type: String, 
    required: true 
  },
  occupation: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  linkedinProfile: { 
    type: String, 
    default: '' 
  },
  achievements: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Achievement' 
  }],
  events: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event' 
  }],
  jobPostings: [{  // This is the field to track job postings by alumni
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting'
  }],
  mentorship: { 
    type: Boolean, 
    default: false  // Indicates if the alumni offers mentorship
  },
  verified: { 
    type: Boolean, 
    default: false  // Indicates if the alumni profile is verified
  },
  testimonials: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Testimonial' 
  }],
  messages: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Message' 
  }],
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference the User model to associate the alumni with a user account
    required: true  // Alumni must be associated with a User
  }
}, { timestamps: true });

// Model Name: Alumni
const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
