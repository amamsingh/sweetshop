import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: 'ritik',
        location: 'chandigarh',
        rating: 5,
        text: "The Kaju Katli from Madhuram Sweets is simply divine! It melts in your mouth. Highly recommended for Diwali gifts.",
        initial: 'r',
        color: 'bg-pink-100 text-pink-700'
    },
    {
        id: 2,
        name: 'gautam',
        location: 'bihar',
        rating: 5,
        text: "Authentic taste! The Motichoor Laddus remind me of my grandmother's recipe. Fresh and perfectly sweetened.",
        initial: 'g',
        color: 'bg-blue-100 text-blue-700'
    },
    {
        id: 3,
        name: 'raju',
        location: 'Bangalore',
        rating: 4,
        text: "Great variety and premium quality. The packaging is beautiful, and the delivery was prompt. Loved the Mysore Pak!",
        initial: 'r',
        color: 'bg-red-100 text-green-700'
    }
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-red-50/50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 font-serif sm:text-4xl">
                        Sweet Words from Our Customers
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        We take pride in serving happiness. Here's what our beloved customers have to say about their Madhuram experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:bg-red-50 hover:border-red-200 transition-all duration-300 p-8 border border-gray-100 relative cursor-default group">
                            <Quote className="absolute top-4 right-4 h-8 w-8 text-red-100" />
                            <div className="flex items-center mb-6">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold ${review.color} mr-4`}>
                                    {review.initial}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 font-serif">{review.name}</h3>
                                    <p className="text-xs text-gray-500">{review.location}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 italic leading-relaxed">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
