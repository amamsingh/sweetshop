import React, { useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';

const HighlightedText = ({ text, highlight }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="bg-yellow-200 text-red-900 rounded px-0.5 font-semibold">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

const SweetCard = ({ sweet, onPurchase, highlightTerm = '' }) => {
    const { id, name, price, quantity, imageUrl, description } = sweet;
    const isOutOfStock = quantity === 0;
    const [isPurchasing, setIsPurchasing] = useState(false);

    const handlePurchaseClick = async () => {
        if (isOutOfStock || isPurchasing) return;

        setIsPurchasing(true);
        await onPurchase(id);
        setIsPurchasing(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative">
            <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                <img
                    src={imageUrl || 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="text-red-700 font-bold text-lg px-6 py-2 border-4 border-red-700 rounded-lg uppercase tracking-wider bg-white shadow-xl transform -rotate-12">Sold Out</span>
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-red-700 transition-colors duration-300 font-serif" title={name}>
                        <HighlightedText text={name} highlight={highlightTerm} />
                    </h3>
                    <span className="text-lg font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full">${price}</span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow leading-relaxed">{description || 'Delicious sweet treat.'}</p>

                <div className="mt-auto space-y-4">
                    <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                        <span className="text-gray-500 font-medium">Quantity</span>
                        <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${isOutOfStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {isOutOfStock ? 'Unavailable' : `${quantity} Left`}
                        </span>
                    </div>

                    <button
                        onClick={handlePurchaseClick}
                        disabled={isOutOfStock || isPurchasing}
                        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-bold text-white transition-all duration-200 relative overflow-hidden
              ${isOutOfStock
                                ? 'bg-gray-300 cursor-not-allowed opacity-70 grayscale text-gray-500'
                                : 'bg-red-700 hover:bg-red-800 active:scale-[0.98] shadow-red-700/20 hover:shadow-red-700/40'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600`}
                    >
                        {isPurchasing ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
