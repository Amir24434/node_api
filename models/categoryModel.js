const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please enter a category name"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description"]
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
