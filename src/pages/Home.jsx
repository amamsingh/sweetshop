import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import SweetCard from '../components/SweetCard';
import { useCart } from '../context/CartContext';
import api from '../api';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
    const [featuredSweets, setFeaturedSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const sweets = await api.getSweets();
                // Filter for sweets that have 'Featured' tag (case insensitive)
                const featured = sweets.filter(s =>
                    s.tags && s.tags.some(tag => tag.toLowerCase() === 'featured')
                ).slice(0, 4); // Limit to 4 items

                // Fallback: If no featured items, show top rated or first 4
                if (featured.length === 0) {
                    setFeaturedSweets(sweets.slice(0, 4));
                } else {
                    setFeaturedSweets(featured);
                }
            } catch (error) {
                console.error('Failed to fetch sweets', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const handlePurchase = async (id) => {
        try {
            const sweet = featuredSweets.find(s => s._id === id || s.id === id);
            if (!sweet || sweet.quantity <= 0) return;

            addToCart(sweet);
            // Optimistic update
            setFeaturedSweets(prev => prev.map(s =>
                (s._id === id || s.id === id) ? { ...s, quantity: s.quantity - 1 } : s
            ));

            await api.purchaseSweet(id);
            toast.success(`Added ${sweet.name} to Cart!`);
        } catch (error) {
            console.error(error);
            toast.error('Could not add to cart');
        }
    };

    return (
        <div className="space-y-16 animate-in fade-in duration-500 pb-12">

            {/* Hero Section */}
            <div className="relative bg-red-800 rounded-3xl overflow-hidden shadow-2xl mx-4 mt-4 lg:mx-0">
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20 bg-repeat"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

                <div className="relative z-10 px-8 py-20 md:py-32 md:px-16 flex flex-col justify-center h-full text-white">
                    <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-sm font-semibold mb-6 w-max backdrop-blur-sm animate-bounce duration-[2000ms]">
                        Since 1985
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold font-serif leading-tight mb-6 drop-shadow-lg">
                        Experience the <br />
                        <span className="text-yellow-400 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">Sweetness</span> of Tradition
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-10 leading-relaxed">
                        Handcrafted with pure Desi Ghee and love. We bring you the authentic taste of India, delivered fresh to your doorstep.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-red-900 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-1"
                        >
                            Order Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                        >
                            View Menu
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Sweets Section */}
            {!loading && featuredSweets.length > 0 && (
                <div className="px-4 lg:px-0">
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Handpicked Favorites
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-serif mb-3">Featured Delights</h2>
                        <p className="text-gray-600 dark:text-gray-400">Our most loved sweets, chosen just for you.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredSweets.map((sweet) => (
                            <SweetCard
                                key={sweet.id || sweet._id}
                                sweet={sweet}
                                onPurchase={handlePurchase}
                            />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link to="/shop" className="inline-flex items-center font-semibold text-red-700 hover:text-red-800 transition-colors">
                            View All Sweets <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Features / USPs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-0">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-red-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group">
                    <div className="bg-red-50 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-all duration-300">
                        <span className="text-3xl">🍯</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Pure Ingredients</h3>
                    <p className="text-gray-500 dark:text-gray-400">Made with 100% pure ghee and premium quality dry fruits.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-red-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group">
                    <div className="bg-red-50 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-all duration-300">
                        <span className="text-3xl">👨‍🍳</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Handcrafted</h3>
                    <p className="text-gray-500 dark:text-gray-400">Traditional recipes passed down through generations.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-red-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group">
                    <div className="bg-red-50 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-all duration-300">
                        <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Fast Delivery</h3>
                    <p className="text-gray-500 dark:text-gray-400">Fresh sweets delivered to your doorstep in record time.</p>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-red-50 dark:bg-gray-900 py-12 rounded-3xl mx-4 lg:mx-0 transition-colors duration-300">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-serif mb-3">Customer Love</h2>
                    <p className="text-gray-600 dark:text-gray-400">What our sweet lovers have to say</p>
                </div>
                <Testimonials />
            </div>

            {/* CTA */}
            <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Ready to indulge?</h2>
                <Link
                    to="/shop"
                    className="inline-flex items-center px-8 py-3 bg-red-700 text-white rounded-xl font-bold text-lg hover:bg-red-800 transition-colors shadow-lg hover:shadow-xl"
                >
                    Visit Our Shop
                </Link>
            </div>
        </div>
    );
};

export default Home;
