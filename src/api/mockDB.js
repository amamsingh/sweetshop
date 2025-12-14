// Initial data
const INITIAL_SWEETS = [
    { id: 1, name: 'Besan Laddu', price: 10.0, quantity: 15, description: 'Traditional Indian sweet made with gram flour, ghee, and sugar, garnished with pistachios.', imageUrl: '/images/besan_laddu.png' },
    { id: 2, name: 'Gulab Jamun', price: 5.0, quantity: 20, description: 'Soft berry-sized balls dipped in rose flavored sugar syrup.', imageUrl: '/images/gulab_jamun.png' },
    { id: 3, name: 'Kaju Katli', price: 12.0, quantity: 18, description: 'Diamond-shaped cashew fudge sweets topped with edible silver leaf.', imageUrl: '/images/kaju_katli.png' },
    { id: 4, name: 'Jalebi', price: 4.0, quantity: 25, description: 'Deep-fried maida flour batter in pretzel or circular shapes, which are then soaked in sugar syrup.', imageUrl: '/images/jalebi.png' },
    { id: 5, name: 'Rasgulla', price: 6.0, quantity: 12, description: 'Spongy white cheese balls soaked in chilled sugar syrup.', imageUrl: '/images/rasgulla.png' },
    { id: 6, name: 'Mysore Pak', price: 8.0, quantity: 14, description: 'Rich sweet dish prepared in ghee, from Southern India, usually served as dessert.', imageUrl: '/images/mysore_pak.png' },
    { id: 7, name: 'Rasmalai', price: 7.0, quantity: 10, description: 'Flattened balls of chhana soaked in malai (clotted cream) flavoured with cardamom.', imageUrl: '/images/rasmalai.png' },
    { id: 8, name: 'Motichoor Laddu', price: 9.0, quantity: 20, description: 'Soft, tiny droplets of gram flour batter fried and immersed in sugar syrup.', imageUrl: '/images/motichoor_laddu.png' },
    { id: 9, name: 'Banana Walnut Halwa', price: 11.0, quantity: 8, description: 'Translucent, glossy halwa made from ripe Nanjangud bananas and crunchy walnuts.', imageUrl: '/images/banana_halwa.png' },
];

const STORAGE_KEY = 'sweet_shop_db';

export const mockDB = {
    getSweets: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stored = localStorage.getItem(STORAGE_KEY);
                // Force refresh if stored data is old or different structure? 
                // For now, we trust storage, but in development, clearing it is common.
                // To ensure new images show up for user without them manually clearing, 
                // we can override storage if it has old data, but that's risky for persistence.
                // We'll stick to resolving initial if null, or user has to clear.
                if (stored) {
                    resolve(JSON.parse(stored));
                } else {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SWEETS));
                    resolve(INITIAL_SWEETS);
                }
            }, 500); // reduced latency for snappier feel
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
