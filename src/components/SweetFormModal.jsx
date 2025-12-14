import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SweetFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                price: initialData.price,
                quantity: initialData.quantity,
                description: initialData.description || '',
                imageUrl: initialData.imageUrl || ''
            });
        } else {
            setFormData({
                name: '',
                price: '',
                quantity: '',
                description: '',
                imageUrl: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity)
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-blur-sm"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-200">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg leading-6 font-bold text-gray-900 font-serif">
                                {initialData ? 'Edit Sweet' : 'Add New Sweet'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} id="sweet-form">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 sticky block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm placeholder-gray-400"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm placeholder-gray-400"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input
                                            type="number"
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm placeholder-gray-400"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input
                                        type="url"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm placeholder-gray-400"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm placeholder-gray-400"
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                        <button
                            type="submit"
                            form="sweet-form"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                        >
                            {initialData ? 'Save Changes' : 'Add Sweet'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SweetFormModal;
