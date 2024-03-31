const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// Middleware to calculate the next available productId
const calculateNextProductId = async () => {
    try {
        const lastCartItem = await Cart.findOne().sort({ productId: -1 });
        return lastCartItem ? lastCartItem.productId + 1 : 1;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Retrieve all cart items
router.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find({}, '-createdAt -updatedAt -__v -_id');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new product to the cart
router.post('/api/cart', async (req, res) => {
    try {
        const { productName, price, image } = req.body;

        // Calculate the next available productId
        const productId = await calculateNextProductId();

        // Create the cart item
        const cartItem = await Cart.create({
            productId,
            productName,
            price,
            image
        });

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a cart item quantity (removed since there's no quantity field in the model)

// Delete a cart item by productId
router.delete('/api/cart/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        // Find and delete the cart item by productId
        const deletedCartItem = await Cart.findOneAndDelete({ productId });

        if (!deletedCartItem) {
            return res.status(404).json({ message: `Cart item with productId '${productId}' not found` });
        }

        res.status(200).json(deletedCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
