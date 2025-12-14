// Initial data
const INITIAL_SWEETS = [
    {
        id: 1,
        name: 'Besan Laddu',
        price: 450.0,
        quantity: 15,
        weight: '1 kg',
        rating: 4.8,
        ingredients: 'Gram flour, Ghee, Sugar, Pistachios',
        description: 'Traditional Indian sweet made with gram flour, ghee, and sugar, garnished with pistachios.',
        imageUrl: '/images/besan_laddu.png',
        tags: ['Bestseller', 'Traditional']
    },
    {
        id: 2,
        name: 'Gulab Jamun',
        price: 240.0,
        quantity: 20,
        weight: '500 g',
        rating: 4.9,
        ingredients: 'Khoya, Sugar Syrup, Rose Water',
        description: 'Soft berry-sized balls dipped in rose flavored sugar syrup.',
        imageUrl: '/images/gulab_jamun.png',
        tags: ['Must Try']
    },
    {
        id: 3,
        name: 'Kaju Katli',
        price: 480.0,
        quantity: 18,
        weight: '500 g',
        rating: 4.7,
        ingredients: 'Cashews, Sugar, Silver Leaf',
        description: 'Diamond-shaped cashew fudge sweets topped with edible silver leaf.',
        imageUrl: '/images/kaju_katli.png',
        tags: ['Premium', 'Gifting']
    },
    {
        id: 4,
        name: 'Jalebi',
        price: 80.0,
        quantity: 25,
        weight: '250 g',
        rating: 4.5,
        ingredients: 'Maida, Saffron, Sugar Syrup',
        description: 'Deep-fried maida flour batter in pretzel or circular shapes, which are then soaked in sugar syrup.',
        imageUrl: '/images/jalebi.png',
        tags: ['Hot', 'Crispy']
    },
    {
        id: 5,
        name: 'Rasgulla',
        price: 350.0,
        quantity: 12,
        weight: '1 kg',
        rating: 4.6,
        ingredients: 'Chhana, Sugar Syrup',
        description: 'Spongy white cheese balls soaked in chilled sugar syrup.',
        imageUrl: '/images/rasgulla.png',
        tags: ['Bestseller']
    },
    {
        id: 6,
        name: 'Mysore Pak',
        price: 400.0,
        quantity: 14,
        weight: '500 g',
        rating: 4.4,
        ingredients: 'Gram flour, Ghee, Sugar',
        description: 'Rich sweet dish prepared in ghee, from Southern India, usually served as dessert.',
        imageUrl: '/images/mysore_pak.png',
        tags: ['Authentic']
    },
    {
        id: 7,
        name: 'Rasmalai',
        price: 200.0,
        quantity: 10,
        weight: '5 pcs',
        rating: 4.9,
        ingredients: 'Chhana, Malai, Saffron',
        description: 'Flattened balls of chhana soaked in malai (clotted cream) flavoured with cardamom.',
        imageUrl: '/images/rasmalai.png',
        tags: ['Chilled', 'Creamy']
    },
    {
        id: 8,
        name: 'Motichoor Laddu',
        price: 400.0,
        quantity: 20,
        weight: '1 kg',
        rating: 4.7,
        ingredients: 'Gram flour pearls, Ghee, Sugar',
        description: 'Soft, tiny droplets of gram flour batter fried and immersed in sugar syrup.',
        imageUrl: '/images/motichoor_laddu.png',
        tags: ['Festive']
    },
    {
        id: 9,
        name: 'Banana Walnut Halwa',
        price: 350.0,
        quantity: 8,
        weight: '500 g',
        rating: 4.8,
        ingredients: 'Nanjangud Bananas, Walnuts, Ghee',
        description: 'Translucent, glossy halwa made from ripe Nanjangud bananas and crunchy walnuts.',
        imageUrl: '/images/banana_halwa.png',
        tags: ['Specialty']
    },
    {
        id: 10,
        name: 'Sandesh',
        price: 320.0,
        quantity: 35,
        weight: '500 g',
        rating: 4.6,
        ingredients: 'Chhana, Sugar, Pistachios',
        description: 'Fresh chhana sweet with pistachio garnish, known for its mild sweetness.',
        imageUrl: '/images/sandesh.png',
        tags: ['Light Sweetness']
    },
    {
        id: 11,
        name: 'Barfi (Milk Cake)',
        price: 340.0,
        quantity: 40,
        weight: '500 g',
        rating: 4.5,
        ingredients: 'Milk, Sugar, Almonds',
        description: 'Rich, grainy milk fudge squares topped with silver vark and almonds.',
        imageUrl: '/images/barfi.png',
        tags: ['Rich']
    },
    {
        id: 12,
        name: 'Soan Papdi',
        price: 180.0,
        quantity: 30,
        weight: '500 g',
        rating: 4.3,
        ingredients: 'Gram flour, Ghee, Sugar, Almonds',
        description: 'Cube-shaped flaky sweet with a crisp texture, made with chickpea flour and ghee.',
        imageUrl: '/images/soan_papdi.png',
        tags: ['Flaky']
    },
    {
        id: 13,
        name: 'Kalakand',
        price: 360.0,
        quantity: 20,
        weight: '500 g',
        rating: 4.7,
        ingredients: 'Milk, Paneer, Sugar',
        description: 'Moist, granular milk cake made from solidified, sweetened milk and paneer.',
        imageUrl: '/images/kalakand.png',
        tags: ['Fresh']
    },
    {
        id: 14,
        name: 'Gujiya',
        price: 280.0,
        quantity: 25,
        weight: '500 g',
        rating: 4.8,
        ingredients: 'Maida, Khoya, Dry Fruits',
        description: 'Crispy deep-fried pastry filled with sweet khoya and dry fruits.',
        imageUrl: '/images/gujiya.png',
        tags: ['Seasonal']
    },
];

const STORAGE_KEY = 'sweet_shop_db';

export const mockDB = {
    getSweets: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stored = localStorage.getItem(STORAGE_KEY);
                // Reset DB if needed. Simplified check: if first item exists but has no tags, reset.
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (parsed.length > 0 && !parsed[0].tags) {
                        // Detected old schema
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SWEETS));
                        resolve(INITIAL_SWEETS);
                    } else {
                        resolve(parsed);
                    }
                } else {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SWEETS));
                    resolve(INITIAL_SWEETS);
                }
            }, 500);
        });
    },

    addSweet: async (sweet) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sweets = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(INITIAL_SWEETS));
                const newSweet = { ...sweet, id: Date.now() };
                sweets.push(newSweet);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(sweets));
                resolve(newSweet);
            }, 500);
        });
    },

    updateSweet: async (id, updates) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sweets = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(INITIAL_SWEETS));
                const index = sweets.findIndex(s => s.id === id);
                if (index !== -1) {
                    sweets[index] = { ...sweets[index], ...updates };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(sweets));
                    resolve(sweets[index]);
                } else {
                    resolve(null);
                }
            }, 500);
        });
    },

    deleteSweet: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let sweets = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(INITIAL_SWEETS));
                sweets = sweets.filter(s => s.id !== id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(sweets));
                resolve(true);
            }, 500);
        });
    },

    purchaseSweet: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const sweets = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(INITIAL_SWEETS));
                const index = sweets.findIndex(s => s.id === id);
                if (index !== -1 && sweets[index].quantity > 0) {
                    sweets[index].quantity -= 1;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(sweets));
                    resolve(sweets[index]);
                } else {
                    reject(new Error('Out of stock'));
                }
            }, 500);
        });
    }
};
