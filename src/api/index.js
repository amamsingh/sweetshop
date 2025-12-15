import client from './axios';

const api = {
    // Auth
    login: async (credentials) => {
        const response = await client.post('/auth/login', credentials);
        return response.data;
    },
    register: async (userData) => {
        const response = await client.post('/auth/register', userData);
        return response.data;
    },

    // Sweets
    getSweets: async () => {
        const response = await client.get('/sweets');
        return response.data;
    },
    addSweet: async (sweetData) => {
        const response = await client.post('/sweets', sweetData);
        return response.data;
    },
    updateSweet: async (id, sweetData) => {
        const response = await client.put(`/sweets/${id}`, sweetData);
        return response.data;
    },
    deleteSweet: async (id) => {
        const response = await client.delete(`/sweets/${id}`);
        return response.data;
    },
    purchaseSweet: async (id) => {
        const response = await client.post(`/sweets/${id}/purchase`);
        return response.data;
    },
    restockSweet: async (id, quantity) => {
        const response = await client.post(`/sweets/${id}/restock`, { quantity });
        return response.data;
    },
    searchSweets: async (query) => {
        const response = await client.get(`/sweets/search?q=${query}`);
        return response.data;
    },

    // Orders
    createOrder: async (orderData) => {
        const response = await client.post('/orders', orderData);
        return response.data;
    },
    getMyOrders: async () => {
        const response = await client.get('/orders/myorders');
        return response.data;
    }
};

export default api;
