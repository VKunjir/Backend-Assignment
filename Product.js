const mongoose = require("mongoose");
const { Counter } = require("./Counter"); // Import the Counter model if required

const productSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    desc: String,
    price: Number,
});

// Middleware to increment the 'id' field before saving a new product
productSchema.pre('save', async function (next) {
    try {
        const doc = this;
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'productId' }, 
            { $inc: { sequence_value: 1 } }, 
            { new: true, upsert: true }
        );
        doc.id = counter.sequence_value;
        next();
    } catch (error) {
        next(error);
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
