import client from './client';
import { mockDB } from './mockDB';

// Use this flag to switch between mock and real API easily during transition/testing
// Set to false to use real backend
const USE_MOCK = false;

const api = {
    // Auth
    login: async (credentials) => {
        if (USE_MOCK) return mockDB.login(credentials); // You'd need to implement this in mockDB if you wanted full mock auth
        const response = await client.post('/auth/login', credentials);
        return response.data;
    },
    register: async (userData) => {
        const response = await client.post('/auth/register', userData);
        return response.data;
    },

    // Sweets
    getSweets: async () => {
        if (USE_MOCK) return mockDB.getSweets();
        const response = await client.get('/sweets');
        return response.data;
    },
    addSweet: async (sweetData) => {
        if (USE_MOCK) return mockDB.addSweet(sweetData);
        const response = await client.post('/sweets', sweetData);
        return response.data;
    },
    updateSweet: async (id, sweetData) => {
        if (USE_MOCK) return mockDB.updateSweet(id, sweetData);
        const response = await client.put(`/sweets/${id}`, sweetData);
        return response.data;
    },
    deleteSweet: async (id) => {
        if (USE_MOCK) return mockDB.deleteSweet(id);
        const response = await client.delete(`/sweets/${id}`);
        return response.data;
    },
    restockSweet: async (id, quantity) => {
        if (USE_MOCK) {
            // Mock logic for restock if needed
            const sweet = await mockDB.getSweets().then(sweets => sweets.find(s => s.id === id));
            if (sweet) {
                return mockDB.updateSweet(id, { quantity: sweet.quantity + Number(quantity) });
            }
            return null;
        }
        const response = await client.post(`/sweets/${id}/restock`, { quantity });
        return response.data;
    }
};

export default api;
