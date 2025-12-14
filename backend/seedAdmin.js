const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        // Temporary hardcode to bypass environment variable issues
        const uri = 'mongodb://127.0.0.1:27017/sweetshop';
        console.log('URI-DEBUG:', uri);
        await mongoose.connect(uri);
        console.log('MongoDB Connected');

        const adminEmail = 'admin@madhuram.com';
        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const user = await User.create({
            name: 'Madhuram Admin',
            email: adminEmail,
            password: 'adminpassword123', // Model will hash this
            role: 'admin',
        });

        console.log(`Admin user created: ${user.email} / adminpassword123`);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedAdmin();
