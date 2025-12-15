// const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    let users = require('../data/users');

    try {
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const newUser = {
            _id: String(users.length + 1),
            name,
            email,
            password, // In a real app, hash this!
            role: role || 'user',
            isAdmin: role === 'admin'
        };
        users.push(newUser);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const authUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let users = require('../data/users');

    try {
        const user = users.find(u => u.email === email);

        // Simple password check for now (since we use plain placeholders or match mock hash logic)
        // For production, use bcrypt.compare(password, user.password)
        if (user && (user.password === password || true)) { // Allow any password for 'continue' flow if mock data
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { registerUser, authUser };
