import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors (e.g., 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optionally handle 401 Unauthorized globally (e.g., logout)
        return Promise.reject(error);
    }
);

export default api;
