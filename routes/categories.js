const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel'); // Assuming you have a Category model




// Middleware to calculate the next available ID
const calculateNextCategoryId = async () => {
    try {
        const count = await Category.countDocuments();
        return count + 1;
    } catch (error) {
        throw new Error(error.message);
    }
};



// Get all categories
router.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find({}).select('-createdAt -updatedAt -_id -__v');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a category
router.post('/api/categories', async (req, res) => {
    try {
        const { name, description, image } = req.body;

        // Calculate the next available category ID
        const id = await calculateNextCategoryId();

        // Create the category with the calculated ID
        const category = await Category.create({
            id,
            name,
            description,
            image,
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Get a category by ID
router.get('/api/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findOne({ id }).select('-createdAt -updatedAt -_id -__v');
        if (!category) {
            return res.status(404).json({ message: `Cannot find any category with ID ${id}` });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a category
router.put('/api/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;

        // Find the category by id
        let category = await Category.findOne({ id });
        if (!category) {
            return res.status(404).json({ message: `Category with id '${id}' not found` });
        }

        // Update the category
        category.name = name;
        category.description = description;
        category.image = image;
        await category.save();

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a category
router.delete('/api/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the category by id
        const category = await Category.findOneAndDelete({ id });
        if (!category) {
            return res.status(404).json({ message: `Category with id '${id}' not found` });
        }

        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
