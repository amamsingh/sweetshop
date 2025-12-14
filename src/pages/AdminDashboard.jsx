import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockDB } from '../api/mockDB';
import SweetFormModal from '../components/SweetFormModal';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSweet, setEditingSweet] = useState(null);

    const fetchSweets = async () => {
        setLoading(true);
        try {
            const data = await mockDB.getSweets();
            setSweets(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load sweets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const handleAdd = () => {
        setEditingSweet(null);
        setIsModalOpen(true);
    };

    const handleEdit = (sweet) => {
        setEditingSweet(sweet);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sweet?')) {
            try {
                await mockDB.deleteSweet(id);
                const updated = await mockDB.getSweets();
                setSweets(updated);
                toast.success('Sweet deleted successfully');
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete sweet');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingSweet) {
                await mockDB.updateSweet(editingSweet.id, formData);
                toast.success('Sweet updated successfully');
            } else {
                await mockDB.addSweet(formData);
                toast.success('New sweet added successfully');
            }
            setIsModalOpen(false);
            fetchSweets();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight font-serif">Admin Dashboard</h1>
                    <p className="mt-1 text-gray-500">Manage your sweet inventory.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add New Sweet
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <RefreshCw className="h-10 w-10 text-red-500 animate-spin" />
                </div>
            ) : (
                <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg border border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {sweets.map((sweet) => (
                            <li key={sweet.id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-red-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <img
                                            className="h-12 w-12 rounded-full object-cover bg-gray-100 border border-gray-200"
                                            src={sweet.imageUrl || 'https://via.placeholder.com/150'}
                                            alt=""
                                        />
                                        <div className="ml-4 truncate">
                                            <div className="text-lg font-medium text-gray-900 truncate font-serif">{sweet.name}</div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <span className="truncate">Price: ${sweet.price}</span>
                                                <span className="mx-2 text-gray-400">•</span>
                                                <span className={`${sweet.quantity === 0 ? 'text-red-600 font-bold' : ''}`}>
                                                    Stock: {sweet.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(sweet)}
                                            className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sweet.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {sweets.length === 0 && (
                            <li className="px-4 py-8 text-center text-gray-500">
                                No sweets available. Add some to get started!
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {/* Reusable Form Modal */}
            <SweetFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={editingSweet}
            />
        </div>
    );
};

export default AdminDashboard;
