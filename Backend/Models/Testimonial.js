const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // Author of the testimonial
  content: { type: String, required: true },
  approved: { type: Boolean, default: false }, // Whether the testimonial is approved by admin
}, { timestamps: true });

// Model Name: Testimonial
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
