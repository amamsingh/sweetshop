import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white border-t-4 border-red-700 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold font-serif mb-4 text-yellow-500">Chandigarh Sweets</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Serving authentic Indian sweets and namkeens since 1990. Taste the tradition in every bite.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
                    <p className="text-gray-400 text-sm">Plot No. 315, Industrial Area</p>
                    <p className="text-gray-400 text-sm">Chandigarh, India</p>
                    <p className="text-gray-400 text-sm mt-2">Ph: +91 98765 43210</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white">Opening Hours</h3>
                    <p className="text-gray-400 text-sm">Mon - Sun: 9:00 AM - 10:00 PM</p>
                    <p className="text-yellow-500 text-sm mt-2 font-medium">Order Online 24/7</p>
                </div>
            </div>
            <div className="bg-black py-4">
                <p className="text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} Chandigarh Sweets. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
