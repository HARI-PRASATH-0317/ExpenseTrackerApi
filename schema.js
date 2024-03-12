const mongoose = require('mongoose');

const expenseTrackerSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true // Consider adding validation like this if applicable
    },
    category: {
        type: String,
        required: true // Consider adding validation like this if applicable
    },
    date: {
        type: String, // Consider using Date type for actual date handling
        required: true // Consider adding validation like this if applicable
    }
});

const Expense = mongoose.model('Expense', expenseTrackerSchema);

module.exports = { Expense };
