const bcrypt = require('bcryptjs');

const users = [
    {
        _id: '1',
        name: 'Madhuram Admin',
        email: 'admin@madhuram.com',
        password: '$2a$10$3/2.d/4.5/6.7/8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3', // Placeholder hash, will be replaced/ignored in mock check or needs valid hash
        isAdmin: true,
        role: 'admin'
    },
    {
        _id: '2',
        name: 'John Doe',
        email: 'user@example.com',
        password: '$2a$10$3/2.d/4.5/6.7/8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3',
        isAdmin: false,
        role: 'user'
    }
];

module.exports = users;
