const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  recommendedAge: {
    type: String,
    required: true
  },
  doses: {
    type: Number,
    required: true
  },
  interval: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vaccine', vaccineSchema);