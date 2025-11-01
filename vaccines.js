const express = require('express');
const router = express.Router();
const Vaccine = require('../models/Vaccine');

// Get all vaccines
router.get('/', async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single vaccine
router.get('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) return res.status(404).json({ message: 'Vaccine not found' });
    res.json(vaccine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create vaccine
router.post('/', async (req, res) => {
  const vaccine = new Vaccine({
    name: req.body.name,
    recommendedAge: req.body.recommendedAge,
    doses: req.body.doses,
    interval: req.body.interval
  });

  try {
    const newVaccine = await vaccine.save();
    res.status(201).json(newVaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update vaccine
router.put('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) return res.status(404).json({ message: 'Vaccine not found' });

    if (req.body.name) vaccine.name = req.body.name;
    if (req.body.recommendedAge) vaccine.recommendedAge = req.body.recommendedAge;
    if (req.body.doses) vaccine.doses = req.body.doses;
    if (req.body.interval) vaccine.interval = req.body.interval;

    const updatedVaccine = await vaccine.save();
    res.json(updatedVaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete vaccine
router.delete('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) return res.status(404).json({ message: 'Vaccine not found' });
    
    await vaccine.deleteOne();
    res.json({ message: 'Vaccine deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;