const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
     name: {
        type: String,
        required: [true, "Please enter a product name"]
    },
    quantity: {
        type: Number,
        required: [true, "Please enter a quantity"],
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Please enter a price"]
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
