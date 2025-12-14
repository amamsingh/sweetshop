# Madhuram Sweets

A full-stack Single Page Application (SPA) for a premium sweet shop, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Browse Sweets:** View a catalog of delicious sweets with details.
- **Shopping Cart:** Add items to cart and manage orders.
- **User Authentication:** Secure login and registration for users.
- **Admin Dashboard:** Manage products (CRUD operations).
- **Responsive Design:** Optimized for mobile and desktop using Tailwind CSS.
- **Localization:** Prices in INR (₹) with realistic formatting.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose).
- **Authentication:** JWT (JSON Web Tokens).

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amamsingh/sweetshop.git
   cd sweet
   ```

2. **Backend Setup:**
   Navigate to the backend directory:
   ```bash
   cd backend
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Create a `.env` file in the `backend` directory based on `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sweetshop
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal and navigate to the project root directory `sweet`:
   ```bash
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend
The `backend/.env` file requires:
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Environment (development/production)

## API Documentation

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/sweets`: Get all sweets
- `POST /api/sweets`: Add a sweet (Admin only)
- `PUT /api/sweets/:id`: Update a sweet (Admin only)
- `DELETE /api/sweets/:id`: Delete a sweet (Admin only)
