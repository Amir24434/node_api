const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // Assuming you have a Product model
const Category = require('../models/categoryModel'); // Assuming you have a Category model

// Middleware to calculate the next available ID
const calculateNextProductId = async () => {
    try {
        const lastProduct = await Product.findOne().sort({ id: -1 });
        return lastProduct ? lastProduct.id + 1 : 1;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Retrieve all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({}).select('-createdAt -updatedAt -_id -__v');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new product
router.post('/api/products', async (req, res) => {
    try {
        const { name, description, category: categoryName, quantity, price, image } = req.body;

        // Find the category by name
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: `Category '${categoryName}' not found` });
        }

        // Calculate the next available ID
        const id = await calculateNextProductId();

        // Create the product with the calculated ID
        const product = await Product.create({
            id,
            name,
            description,
            category: categoryName,
            quantity,
            price,
            image
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a product
router.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category: categoryName, quantity, price, image } = req.body;

        // Find the product by id
        const product = await Product.findOne({ id });
        if (!product) {
            return res.status(404).json({ message: `Product with id '${id}' not found` });
        }

        // Find the category by name
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: `Category '${categoryName}' not found` });
        }

        // Update the product
        product.name = name;
        product.description = description;
        product.category = categoryName;
        product.quantity = quantity;
        product.price = price;
        product.image = image;
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a product
router.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the product by id
        const product = await Product.findOneAndDelete({ id });
        if (!product) {
            return res.status(404).json({ message: `Product with id '${id}' not found` });
        }

        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by id
router.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product by id
        const product = await Product.findOne({ id }).select('-createdAt -updatedAt -_id -__v');
        if (!product) {
            return res.status(404).json({ message: `Product with id '${id}' not found` });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
