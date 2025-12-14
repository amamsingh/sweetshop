import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Menu, X, ShoppingBag, User, LogOut, ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);

    // Trigger animation when totalItems changes
    useEffect(() => {
        if (totalItems > 0) {
            setAnimateCart(true);
            const timer = setTimeout(() => setAnimateCart(false), 300); // 300ms bounce
            return () => clearTimeout(timer);
        }
    }, [totalItems]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-red-700 shadow-lg sticky top-0 z-50 border-b-4 border-yellow-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center group">
                            <div className="bg-white p-2 rounded-full shadow-md">
                                <ShoppingBag className="h-8 w-8 text-red-700" />
                            </div>
                            <div className="ml-3 flex flex-col">
                                <span className="text-2xl font-bold text-white tracking-wide font-serif">Chandigarh Sweets</span>
                                <span className="text-xs text-yellow-300 font-medium tracking-widest uppercase">Traditional Taste</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link to="/" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-base font-semibold transition-colors">
                            Home
                        </Link>

                        {/* Animated Cart Link */}
                        <div className="relative group">
                            <Link to="/cart" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-base font-semibold transition-colors flex items-center">
                                <span className={`mr-2 transition-transform ${animateCart ? 'animate-bounce' : 'group-hover:translate-x-1'}`}>
                                    Cart
                                </span>
                                <div className={`relative p-1 ${animateCart ? 'animate-wiggle' : ''}`}>
                                    <ShoppingCart className="h-6 w-6" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-yellow-500 text-red-900 text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center shadow-sm animate-in zoom-in-50 duration-200">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </div>

                        {isAuthenticated ? (
                            <>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-base font-semibold transition-colors">
                                        Admin Panel
                                    </Link>
                                )}
                                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-red-500">
                                    <span className="text-sm text-red-100 flex items-center font-medium">
                                        <User className="h-4 w-4 mr-2" /> {user.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-200 hover:text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-white hover:text-yellow-200 font-semibold text-base transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-yellow-500 text-red-900 px-5 py-2.5 rounded-full text-base font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-black/20 hover:scale-105 active:scale-95">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-red-200 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-red-800 border-t border-red-600">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-100 hover:bg-red-700 hover:border-yellow-400 hover:text-white transition-all">
                            Home
                        </Link>
                        <Link to="/cart" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-100 hover:bg-red-700 hover:border-yellow-400 hover:text-white transition-all flex items-center">
                            Cart
                            {totalItems > 0 && <span className="ml-2 bg-yellow-500 text-red-900 text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>}
                        </Link>
                        {isAuthenticated ? (
                            <>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-100 hover:bg-red-700 hover:border-yellow-400 hover:text-white transition-all">
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-300 hover:bg-red-700 hover:border-red-400 hover:text-white transition-all"
                                >
                                    Logout ({user.name})
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-100 hover:bg-red-700 hover:text-white transition-all">
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-yellow-300 hover:bg-red-700 hover:text-yellow-200 transition-all">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
            {/* Festive Hanging Decorations */}
            <div className="absolute top-full left-0 w-full overflow-hidden pointer-events-none flex justify-around -mt-1 z-10">
                <img src="/images/marigold_garland.png" alt="" className="h-48 w-auto opacity-90 drop-shadow-md animate-sway origin-top" style={{ animationDelay: '0s' }} />
                <img src="/images/marigold_garland.png" alt="" className="h-64 w-auto opacity-90 drop-shadow-md animate-sway origin-top hidden sm:block" style={{ animationDelay: '1s' }} />
                <img src="/images/marigold_garland.png" alt="" className="h-40 w-auto opacity-90 drop-shadow-md animate-sway origin-top hidden md:block" style={{ animationDelay: '0.5s' }} />
                <img src="/images/marigold_garland.png" alt="" className="h-56 w-auto opacity-90 drop-shadow-md animate-sway origin-top" style={{ animationDelay: '1.5s' }} />
                <img src="/images/marigold_garland.png" alt="" className="h-44 w-auto opacity-90 drop-shadow-md animate-sway origin-top hidden lg:block" style={{ animationDelay: '0.2s' }} />
                <img src="/images/marigold_garland.png" alt="" className="h-60 w-auto opacity-90 drop-shadow-md animate-sway origin-top hidden xl:block" style={{ animationDelay: '1.2s' }} />
            </div>
        </nav>
    );
};

export default Navbar;
