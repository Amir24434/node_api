const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, // Assuming the image will be stored as a URL
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
