
import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    default: 'About Us'
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
  },
  images: {
    type: [String], // Array of image URLs
    required: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// We ensure only one document exists, but schema doesn't strictly enforce this.
// Logic in API will handle singleton behavior.

export default mongoose.models.About || mongoose.model('About', AboutSchema);
