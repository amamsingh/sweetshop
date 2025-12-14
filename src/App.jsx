import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes without Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes with Layout */}
            <Route element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
