import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-amber-50/50 text-gray-900 font-sans">
            <Navbar />
            <main className="flex-grow">
                {/* Main Content Container - adjusted padding for festive look */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
