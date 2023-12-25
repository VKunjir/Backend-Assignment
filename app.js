const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const Product = require("./Product");
const Counter = require("./Counter");


mongoose.connect("mongodb://127.0.0.1:27017/Product")
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((e) => {
    console.log(e);
  });


// Middleware function to log request details
const logRequest = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ${method} request to ${url}`);
    next();
};

// Apply the middleware globally to log request details for every incoming request
app.use(logRequest);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

let products = []; // In-memory array to store product data
let productId = 1; // Variable to generate an ID for new products

// Create New Product
app.post("/api/products", async (req, res) => {
    try {
        // Check if the request body is empty
        if (Object.keys(req.body).length === 0) {
            throw new Error('Request body cannot be empty');
        }

        // Check if 'name' field is missing
        if (!req.body.hasOwnProperty('name')) {
            throw new Error('Name field is required');
        }

        // Check if 'price' field is missing
        if (!req.body.hasOwnProperty('price')) {
            throw new Error('Price field is required');
        }

        const product = await Product.create(req.body);

        // Add the product to the in-memory array
        products.push(product);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        // Return a 500 status code for missing 'name' or 'price' fields
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Retrieve all products
app.get("/api/products", async(req,res)=>{
    try {
        // Fetch products from the Mongoose model
        const productsFromDB = await Product.find();

        // Update the in-memory array with products from the database
        products = [...productsFromDB];

        res.status(200).json({
            success:true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Retrieve products by ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});



// Update product by ID
app.put("/api/products/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const updatedProduct = req.body;

        // Find the product in the in-memory array and update it
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products[index] = { id: productId, ...updatedProduct };
            return res.status(200).json({
                success: true,
                product: products[index]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete product by ID
app.delete("/api/products/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const initialLength = products.length;

        // Remove the product from the in-memory array
        products = products.filter(product => product.id !== productId);

        if (products.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// The rest of your code remains unchanged
app.listen(4500, () => {
    console.log("Server is running on http://localhost:4500");
    console.log("Products are ", products);
});

module.exports = app;