import React, { createContext, useContext, useState, useEffect } from 'react';


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('sweet_shop_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('sweet_shop_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (sweet) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === sweet.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === sweet.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...sweet, quantity: 1 }];
        });
        // This toast will be handled by the UI component for custom styling, 
        // but context provides the logic.
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
