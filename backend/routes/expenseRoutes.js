const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { auth, adminAuth } = require('../middleware/auth');

// GET all expenses - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const expenses = await Expense.find().populate('trip').populate('vehicle').populate('createdBy');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single expense - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate('trip').populate('vehicle').populate('createdBy');
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new expense - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  const expense = new Expense(req.body);
  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update expense - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE expense - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
