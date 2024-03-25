const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        description: {
            type: String,
            required: [true, "Please enter a product description"]
        },
        category: {
            type: String,
            required: [true, "Please enter a category"]
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
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
