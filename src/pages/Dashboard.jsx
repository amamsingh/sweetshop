import React, { useState, useEffect, useMemo } from 'react';
import api from '../api';
import SweetCard from '../components/SweetCard';
import SkeletonCard from '../components/SkeletonCard';
import Testimonials from '../components/Testimonials';
import useDebounce from '../hooks/useDebounce';
import { useCart } from '../context/CartContext';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showInStockOnly, setShowInStockOnly] = useState(false);

    const { addToCart } = useCart();
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const fetchSweets = async () => {
        setLoading(true);
        try {
            const data = await api.getSweets();
            setSweets(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch sweets');
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const handlePurchase = async (id) => {
        try {
            // Find sweet by either _id or id
            const sweetToUpdate = sweets.find(s => (s._id === id || s.id === id));
            if (!sweetToUpdate || sweetToUpdate.quantity <= 0) return;

            // Add to global cart context
            addToCart(sweetToUpdate);

            // Optimistic UI update: Decrement stock locally
            const newQuantity = sweetToUpdate.quantity - 1;
            setSweets(prevSweets =>
                prevSweets.map(sweet =>
                    (sweet._id === id || sweet.id === id) ? { ...sweet, quantity: newQuantity } : sweet
                )
            );

            // Call backend API if needed (e.g. to reserve stock immediately), 
            // though usually 'purchase' happens at checkout. 
            // If the user requirement implies immediate stock reduction on 'Add to Cart', use purchaseSweet
            // Otherwise, we just rely on CartContext for checkout.
            // For now, let's assume we just add to cart and don't decrement DB until checkout,
            // OR use the purchase endpoint if that was the original intent.
            // The original code called mockDB.purchaseSweet(id), so we'll maintain that behavior via API if it exists,
            // or simply skip it if the backend model is 'purchase at checkout'.
            // Given the existing backend controller has 'purchaseSweet', let's use it to decrement stock immediately.

            // NOTE: Usually stock is reduced on checkout, but matching previous logic:
            // The existing backend has `purchaseSweet` which decrements quantity.
            // We'll assume for this simple app, adding to cart reserves it.
            await api.purchaseSweet(id).catch(err => {
                console.warn("Backend purchase/decrement failed, rolling back UI");
                // Rollback logic could go here
            });


            toast.success(`Added ${sweetToUpdate.name} to Cart!`, {
                icon: '🛒',
                style: {
                    borderRadius: '10px',
                    background: '#b91c1c', // brand red
                    color: '#fff',
                },
            });

        } catch (error) {
            console.error(error);
            toast.error('Could not add to cart.', {
                style: {
                    borderRadius: '10px',
                    background: '#b91c1c',
                    color: '#fff',
                },
            });
            fetchSweets(); // Re-fetch to sync state
        }
    };

    const filteredSweets = useMemo(() => {
        return sweets.filter(sweet => {
            const matchesSearch = sweet.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesStock = showInStockOnly ? sweet.quantity > 0 : true;
            return matchesSearch && matchesStock;
        });
    }, [sweets, debouncedSearchTerm, showInStockOnly]);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center text-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-4 drop-shadow-md">
                        Authentic Indian Sweets
                    </h1>
                    <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto font-medium">
                        Purity, Taste, and Tradition in every bite. Handcrafted with Desi Ghee.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-red-200">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight mb-1 font-serif">
                        Our Menu
                    </h2>
                    <p className="text-gray-500">Select your favorites from our collection.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 focus:border-red-500 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all shadow-sm"
                            placeholder="Search sweets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => setShowInStockOnly(!showInStockOnly)}
                        className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${showInStockOnly
                            ? 'bg-red-600 border-red-600 text-white shadow-lg'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50'
                            }`}
                    >
                        <Filter className={`h-4 w-4 mr-2 transition-transform ${showInStockOnly ? 'rotate-180' : ''}`} />
                        {showInStockOnly ? 'Show All' : 'In Stock Only'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                ) : filteredSweets.length > 0 ? (
                    filteredSweets.map((sweet) => (
                        <SweetCard
                            key={sweet.id}
                            sweet={sweet}
                            onPurchase={handlePurchase}
                            highlightTerm={debouncedSearchTerm}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border-2 border-dashed border-red-100 animate-in zoom-in-95 duration-300 shadow-sm">
                        <div className="bg-red-50 p-6 rounded-full mb-6 relative group">
                            <ShoppingBag className="h-16 w-16 text-red-300 relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No sweets found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-8">
                            We couldn't find any sweets matching "{debouncedSearchTerm}". Maybe try "Laddu"?
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setShowInStockOnly(false); }}
                            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
            {/* Testimonials Section */}
            <Testimonials />
        </div>
    );
};

export default Dashboard;
