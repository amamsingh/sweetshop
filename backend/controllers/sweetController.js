const sweetsData = require('../data/sweets');
// In-memory data for the session
let sweets = [...sweetsData];

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
const getSweets = async (req, res) => {
    // Return all sweets
    res.json(sweets);
};

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Public
const searchSweets = async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    let results = [...sweets];

    if (name) {
        results = results.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (category) {
        results = results.filter(s => s.category && s.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (minPrice) {
        results = results.filter(s => s.price >= Number(minPrice));
    }
    if (maxPrice) {
        results = results.filter(s => s.price <= Number(maxPrice));
    }

    res.json(results);
};

// @desc    Create a sweet
// @route   POST /api/sweets
// @access  Private/Admin
const createSweet = async (req, res) => {
    // Mock creation - does not persist
    const newSweet = { ...req.body, _id: String(sweets.length + 1) };
    sweets.push(newSweet);
    res.status(201).json(newSweet);
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private/Admin
const updateSweet = async (req, res) => {
    const { id } = req.params;
    const index = sweets.findIndex(s => s._id === id || s.id === id);

    if (index !== -1) {
        sweets[index] = { ...sweets[index], ...req.body };
        res.json(sweets[index]);
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
const deleteSweet = async (req, res) => {
    const { id } = req.params;
    sweets = sweets.filter(s => s._id !== id && s.id !== id);
    res.json({ message: 'Sweet removed' });
};

// @desc    Purchase a sweet (reduce quantity)
// @route   POST /api/sweets/:id/purchase
// @access  Private
const purchaseSweet = async (req, res) => {
    const { id } = req.params;
    const sweet = sweets.find(s => s._id === id || s.id === id);

    if (sweet) {
        console.log(`Purchasing ${sweet.name}. Old Qty: ${sweet.quantity}`);
        if (sweet.quantity > 0) {
            sweet.quantity = sweet.quantity - 1;
            console.log(`New Qty: ${sweet.quantity}`);
            res.json(sweet);
        } else {
            res.status(400).json({ message: 'Sweet is out of stock' });
        }
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

// @desc    Restock a sweet (increase quantity)
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
const restockSweet = async (req, res) => {
    const { quantity } = req.body;
    const { id } = req.params;
    const sweet = sweets.find(s => s._id === id || s.id === id);

    if (sweet) {
        sweet.quantity = sweet.quantity + Number(quantity);
        res.json(sweet);
    } else {
        res.status(404).json({ message: 'Sweet not found' });
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
