const Sweet = require('../models/Sweet');
const { validationResult } = require('express-validator');

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
const getSweets = async (req, res) => {
    try {
        const sweets = await Sweet.find({});
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Public
const searchSweets = async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    let query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }
    if (category) {
        query.category = { $regex: category, $options: 'i' };
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    try {
        const sweets = await Sweet.find(query);
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a sweet
// @route   POST /api/sweets
// @access  Private/Admin
const createSweet = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, quantity } = req.body;

    try {
        const sweet = new Sweet({
            name,
            category,
            price,
            quantity,
        });

        const createSweet = await sweet.save();
        res.status(201).json(createSweet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private/Admin
const updateSweet = async (req, res) => {
    const { name, category, price, quantity } = req.body;

    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            sweet.name = name || sweet.name;
            sweet.category = category || sweet.category;
            sweet.price = price || sweet.price;
            sweet.quantity = quantity !== undefined ? quantity : sweet.quantity;

            const updatedSweet = await sweet.save();
            res.json(updatedSweet);
        } else {
            res.status(404);
            throw new Error('Sweet not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
const deleteSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            await sweet.deleteOne();
            res.json({ message: 'Sweet removed' });
        } else {
            res.status(404);
            throw new Error('Sweet not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Purchase a sweet (reduce quantity)
// @route   POST /api/sweets/:id/purchase
// @access  Private
const purchaseSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            if (sweet.quantity > 0) {
                sweet.quantity = sweet.quantity - 1;
                const updatedSweet = await sweet.save();
                res.json(updatedSweet);
            } else {
                res.status(400);
                throw new Error('Sweet is out of stock');
            }
        } else {
            res.status(404);
            throw new Error('Sweet not found');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Restock a sweet (increase quantity)
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
const restockSweet = async (req, res) => {
    const { quantity } = req.body;

    try {
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            sweet.quantity = sweet.quantity + Number(quantity);
            const updatedSweet = await sweet.save();
            res.json(updatedSweet);
        } else {
            res.status(404);
            throw new Error('Sweet not found');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getSweets,
    searchSweets,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet,
};
