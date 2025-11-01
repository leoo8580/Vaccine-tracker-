const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  vaccine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
    required: true
  },
  dose: {
    type: Number,
    required: true
  },
  administered: {
    type: Date,
    required: true
  },
  nextDue: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['Completed', 'Due', 'Overdue']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Record', recordSchema);