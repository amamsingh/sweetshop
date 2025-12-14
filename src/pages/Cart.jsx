import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cart, removeFromCart, totalPrice, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearCart();
        toast.success('Order placed successfully! Thank you for choosing Madhuram Sweets.', {
            duration: 5000,
            icon: '🎉',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
        setIsCheckingOut(false);
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-red-100 max-w-md w-full">
                    <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="h-12 w-12 text-red-300" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added any sweets yet.</p>
                    <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 rounded-xl text-white font-bold tracking-wide hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/25">
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 font-serif">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <ul className="divide-y divide-gray-100">
                            {cart.map((item) => (
                                <li key={item.id} className="p-6 flex items-center">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="ml-6 flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-bold text-gray-900 font-serif">{item.name}</h3>
                                            <p className="text-lg font-bold text-red-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-sm text-gray-600 font-medium">
                                                Qty: x {item.quantity}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button onClick={clearCart} className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors">
                            Clear Cart
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 font-serif">Order Summary</h2>
                        <div className="flow-root">
                            <dl className="-my-4 divide-y divide-gray-100">
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">₹{totalPrice.toFixed(2)}</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Tax</dt>
                                    <dd className="font-medium text-gray-900">₹0.00</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between border-t border-gray-200">
                                    <dt className="text-lg font-bold text-gray-900">Total</dt>
                                    <dd className="text-xl font-bold text-red-600">₹{totalPrice.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="mt-8 w-full bg-red-600 text-white rounded-xl py-4 font-bold text-lg shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isCheckingOut ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Processing...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
