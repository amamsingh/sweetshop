import React, { useState, useEffect, useMemo } from 'react';
import api from '../api';
import SweetCard from '../components/SweetCard';
import SkeletonCard from '../components/SkeletonCard';
import useDebounce from '../hooks/useDebounce';
import { useCart } from '../context/CartContext';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const Shop = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [sortOrder, setSortOrder] = useState('recommended');

    const { addToCart } = useCart();
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const { data } = await api.get('/sweets');
                setSweets(data);
            } catch (error) {
                console.error('Failed to fetch sweets:', error);
                toast.error('Could not load sweets.');
            } finally {
                setLoading(false);
            }
        };

        fetchSweets();
    }, []);

    const handlePurchase = (sweet) => {
        addToCart(sweet);
        toast.success(`${sweet.name} added to cart!`);
    };

    const filteredSweets = useMemo(() => {
        let result = sweets.filter(sweet => {
            const matchesSearch = sweet.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesStock = showInStockOnly ? sweet.quantity > 0 : true;
            return matchesSearch && matchesStock;
        });

        if (sortOrder === 'price-low-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-high-low') {
            result.sort((a, b) => b.price - a.price);
        }
        // 'recommended' keeps original order

        return result;
    }, [sweets, debouncedSearchTerm, showInStockOnly, sortOrder]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 min-h-screen">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200 mt-6 md:mt-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-serif mb-2">Our Collection</h1>
                    <p className="text-gray-500">Explore our delicious range of traditional Indian sweets.</p>
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

                    <div className="flex gap-2">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm cursor-pointer"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>

                        <button
                            onClick={() => setShowInStockOnly(!showInStockOnly)}
                            className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border whitespace-nowrap ${showInStockOnly
                                ? 'bg-red-600 border-red-600 text-white shadow-lg'
                                : 'bg-white border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50'
                                }`}
                        >
                            <Filter className={`h-4 w-4 mr-2 transition-transform ${showInStockOnly ? 'rotate-180' : ''}`} />
                            {showInStockOnly ? 'In Stock' : 'Show All'}
                        </button>
                    </div>
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
        </div>
    );
};

export default Shop;
