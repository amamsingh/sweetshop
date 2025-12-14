import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-16 animate-in fade-in duration-500 pb-12">

            {/* Hero Section */}
            <div className="relative bg-red-800 rounded-3xl overflow-hidden shadow-2xl mx-4 mt-4 lg:mx-0">
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20 bg-repeat"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

                <div className="relative z-10 px-8 py-20 md:py-32 md:px-16 flex flex-col justify-center h-full text-white">
                    <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-sm font-semibold mb-6 w-max backdrop-blur-sm">
                        Since 1985
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold font-serif leading-tight mb-6">
                        Experience the <br />
                        <span className="text-yellow-400">Sweetness</span> of Tradition
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

            {/* Features / USPs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-0">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-shadow text-center group">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">🍯</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Pure Ingredients</h3>
                    <p className="text-gray-500">Made with 100% pure ghee and premium quality dry fruits.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-shadow text-center group">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">👨‍🍳</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Handcrafted</h3>
                    <p className="text-gray-500">Traditional recipes passed down through generations.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-shadow text-center group">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Fast Delivery</h3>
                    <p className="text-gray-500">Fresh sweets delivered to your doorstep in record time.</p>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-red-50 py-12 rounded-3xl mx-4 lg:mx-0">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-3">Customer Love</h2>
                    <p className="text-gray-600">What our sweet lovers have to say</p>
                </div>
                <Testimonials />
            </div>

            {/* CTA */}
            <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Ready to indulge?</h2>
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
