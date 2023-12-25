const mongoose = require("mongoose");

// Creating a separate counter schema to generate auto-incrementing sequence
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;