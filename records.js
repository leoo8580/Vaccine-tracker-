const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find()
      .populate('patient')
      .populate('vaccine');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single record
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id)
      .populate('patient')
      .populate('vaccine');
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get records by patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const records = await Record.find({ patient: req.params.patientId })
      .populate('patient')
      .populate('vaccine');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create record
router.post('/', async (req, res) => {
  const record = new Record({
    patient: req.body.patientId,
    vaccine: req.body.vaccineId,
    dose: req.body.dose,
    administered: req.body.administered,
    nextDue: req.body.nextDue,
    status: req.body.status
  });

  try {
    const newRecord = await record.save();
    const populatedRecord = await Record.findById(newRecord._id)
      .populate('patient')
      .populate('vaccine');
    res.status(201).json(populatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update record
router.put('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    if (req.body.patientId) record.patient = req.body.patientId;
    if (req.body.vaccineId) record.vaccine = req.body.vaccineId;
    if (req.body.dose) record.dose = req.body.dose;
    if (req.body.administered) record.administered = req.body.administered;
    if (req.body.nextDue) record.nextDue = req.body.nextDue;
    if (req.body.status) record.status = req.body.status;

    const updatedRecord = await record.save();
    const populatedRecord = await Record.findById(updatedRecord._id)
      .populate('patient')
      .populate('vaccine');
    res.json(populatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    
    await record.deleteOne();
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;