const mongoose = require('mongoose');

const sweetSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: false,
            default: 'General',
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        weight: {
            type: String,
            required: false,
        },
        rating: {
            type: Number,
            required: false,
            default: 0,
        },
        ingredients: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        tags: {
            type: [String],
            required: false,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Sweet = mongoose.model('Sweet', sweetSchema);

module.exports = Sweet;
