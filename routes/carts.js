const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// Get all carts
router.get('/api/carts', async (req, res) => {
    try {
        const carts = await Cart.find({});
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a cart by ID
router.get('/api/carts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ message: `Cannot find any cart with ID ${id}` });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new cart
router.post('/api/carts', async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a cart
router.put('/api/carts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCart) {
            return res.status(404).json({ message: `Cannot find any cart with ID ${id}` });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a cart
router.delete('/api/carts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({ message: `Cannot find any cart with ID ${id}` });
        }
        res.status(200).json(deletedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
