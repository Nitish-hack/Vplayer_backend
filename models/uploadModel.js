const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    
  },
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  video: {
    data: Buffer,
    contentType: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;