const asyncHandler = require('express-async-handler');
// const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const orders = require('../data/orders');

        const order = {
            _id: String(orders.length + 1),
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false,
            isDelivered: false,
            createdAt: new Date().toISOString()
        };

        orders.push(order);

        res.status(201).json(order);
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = require('../data/orders');
    const userOrders = orders.filter(order =>
        order.user === req.user._id ||
        order.user === req.user.id ||
        (typeof req.user === 'string' && order.user === req.user) // Handle potential mock user strings
    );
    res.json(userOrders);
});

module.exports = {
    addOrderItems,
    getMyOrders,
};
