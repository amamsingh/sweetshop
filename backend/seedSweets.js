const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sweet = require('./models/Sweet');

dotenv.config();

const sweets = [
    {
        name: 'Motichoor Laddu',
        description: 'Tiny pearls of gram flour fried in ghee and soaked in sugar syrup.',
        price: 350,
        weight: '500g',
        ingredients: 'Gram flour, Sugar, Ghee, Cardamom',
        imageUrl: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['Bestseller', 'Traditional'],
        rating: 4.8,
        quantity: 50
    },
    {
        name: 'Kaju Katli',
        description: 'Diamond-shaped sweet made with cashew nuts and sugar.',
        price: 850,
        weight: '500g',
        ingredients: 'Cashews, Sugar, Cardamom',
        imageUrl: 'https://images.unsplash.com/photo-1629166698686-2a628859736c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['Premium', 'Gift'],
        rating: 4.9,
        quantity: 30
    },
    {
        name: 'Gulab Jamun',
        description: 'Soft, spongy milky balls soaked in rose scented sugar syrup.',
        price: 300,
        weight: '1kg',
        ingredients: 'Khoya, Sugar, Rose water, Cardamom',
        imageUrl: 'https://images.unsplash.com/photo-1605196392070-5154316ae285?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['Classic', 'Bestseller'],
        rating: 4.7,
        quantity: 40
    },
    {
        name: 'Rasgulla',
        description: 'Syrupy dessert popular in the Indian subcontinent and regions with South Asian diaspora.',
        price: 280,
        weight: '1kg',
        ingredients: 'Chenna, Sugar, Water',
        imageUrl: 'https://images.unsplash.com/photo-1590059960762-c0f5f99238eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['Bengali'],
        rating: 4.6,
        quantity: 45
    },
    {
        name: 'Mysore Pak',
        description: 'Rich sweet made of generous amounts of ghee, sugar, gram flour, and often cardamom.',
        price: 450,
        weight: '500g',
        ingredients: 'Gram flour, Ghee, Sugar',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['South Indian', 'Rich'],
        rating: 4.5,
        quantity: 25
    },
    {
        name: 'Jalebi',
        description: 'Spirals of crispy deep fried batter soaked in sugar syrup.',
        price: 200,
        weight: '500g',
        ingredients: 'Maida, Sugar, Saffron',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['Crispy'],
        rating: 4.4,
        quantity: 60
    },
    {
        name: 'Soan Papdi',
        description: 'Cube-shaped crispy and flaky sweet with a distinct texture.',
        price: 250,
        weight: '500g',
        ingredients: 'Gram flour, Sugar, Ghee, Milk',
        imageUrl: 'https://images.unsplash.com/photo-1615560592934-8d485125301a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['Traditional', 'Gift'],
        rating: 4.3,
        quantity: 100
    },
    {
        name: 'Besan Laddu',
        description: 'Sweet balls made from gram flour, sugar, and ghee.',
        price: 320,
        weight: '500g',
        ingredients: 'Gram flour, Ghee, Sugar',
        imageUrl: 'https://images.unsplash.com/photo-1662240974797-0f81a7071649?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['Home-style'],
        rating: 4.8,
        quantity: 35
    }
];

const seedDB = async () => {
    try {
        // Fallback URI if env not loaded correctly in script context
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sweetshop';
        console.log(`Connecting to ${uri}...`);
        await mongoose.connect(uri);
        console.log('MongoDB Connected');

        console.log('Clearing existing sweets...');
        await Sweet.deleteMany({});

        console.log('Seeding sweets...');
        await Sweet.insertMany(sweets);

        console.log('Sweets seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
