# Deployment Guide (Render.com)

This application is configured for a **Monolithic Deployment** (Frontend + Backend on a single service).

## Steps to Deploy

1.  **Push to GitHub**: Ensure your latest code is pushed.
2.  **Create Account on Render**: Go to [dashboard.render.com](https://dashboard.render.com/).
3.  **New Web Service**: Click "New +" -> "Web Service".
4.  **Connect Repo**: Select your `sweetshop` repository.
5.  **Configuration**:
    -   **Name**: `madhuram-sweets` (or any name you like)
    -   **Region**: Closest to you (e.g., Singapore, Frankfurt)
    -   **Branch**: `main`
    -   **Root Directory**: Leave empty (defaults to `.`)
    -   **Runtime**: `Node`
    -   **Build Command**: `npm install && npm run build`
    -   **Start Command**: `npm start`
6.  **Environment Variables**:
    Current app uses a local JSON database, so no external DB connection string is needed yet.
    -   Add `NODE_ENV` = `production`
7.  **Click "Create Web Service"**.

## Troubleshooting
-   **Build Fails?** Check the logs. Ensure `npm install` runs successfully.
-   **Port Issues?** Render automatically exposes the port `server.js` listens on (port 5000 is default fallback, Render sets `PORT` env var).

## Database Note
Currently, data is stored in memory or JSON files in `backend/data`.
-   **Warning**: On free tier hosting like Render, the filesystem is ephemeral. This means **data resets** every time the server restarts or you deploy.
-   **Solution**: Connect to a real MongoDB Atlas database for persistent storage.
    1.  Create MongoDB Atlas account.
    2.  Get Connection String.
    3.  Add `MONGO_URI` to Render Environment Variables.
    4.  Uncomment `connectDB()` in `backend/server.js` and use it.
