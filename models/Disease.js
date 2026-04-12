import mongoose from 'mongoose';

const DiseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a disease name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  type: {
    type: String,
    enum: ['plant', 'tree'],
    required: [true, 'Please specify if it is a plant or tree'],
  },
  symptoms: [{
    type: String,
  }],
  homemadeRemedies: {
    type: String,
  },
  scientificRemedies: {
    type: String,
  },
  pictures: [{
    type: String, // Base64 encoded strings
  }],
}, { timestamps: true });

export default mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);
