# DriveX

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.3-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-v4.8.1-black.svg)](https://socket.io/)

## 🚀 Live Demo

Experience the application live: [https://drive-x.netlify.app](https://drive-x.netlify.app)

## 📌 Overview

DriveX is a full-stack ride-hailing application built with real-time features, map integration, user authentication, and secure payment processing. It replicates core ride-sharing functionalities such as ride requests, live tracking, and driver-passenger interaction, delivering a seamless end-to-end experience.

## ✨ Features

- **User Authentication & Authorization**

  - Separate flows for passengers and drivers
  - JWT-based authentication
  - Secure password handling with bcrypt

- **Real-Time Tracking & Communication**

  - Live location tracking using SerpApi API
  - Real-time driver-passenger communication
  - Socket.io powered instant updates

- **Ride Management**

  - Multiple vehicle type options
  - Dynamic fare calculation
  - Ride status tracking
  - Driver acceptance/rejection system

- **Payment Integration**

  - Secure payment processing with Stripe
  - Real-time payment status confirmation
  - Simple payment flow for rides

- **Interactive Maps**
  - Real-time user location updates on the map
  - Dynamic pricing based on distance
  - Distance and time estimation

## 📂 Project Structure

### 📂 Backend

```
backend/
├── controllers/      # Request handlers and business logic
├── db/               # Database Connection
├── middlewares/      # Custom middleware functions
├── models/           # MongoDB schema definitions
├── routes/           # API route definitions
├── services/         # Business logic and external service integration
└── app.js            # Express application setup
└── server.js         # Create server and initialize socket
├── socket.js         # Real-time communication handler
```

### 📂 Frontend

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/   # Reusable UI components
│   ├── context/      # React Context providers
│   ├── pages/        # Main application Pages
│   ├── Routes/       # Application routing
│   └── utilities/    # Helper functions and utilities
```

## 🛠️ What I Built With

Here's the tech stack I chose for this project:

### Backend

Built with Node.js, Express.js, and MongoDB. Real-time updates use Socket.IO, authentication via JWT, and payments handled securely with Stripe.

### Frontend

The frontend is built with React and set up using Vite for faster development. React Router handles navigation, and MapLibre GL powers the mapping features. Styling is done with Tailwind CSS for a clean, modern UI. Real-time updates are managed with Socket.IO-client.

## 🚀 Want to Run it Locally?

If you want to play around with the code, here's how to get it running on your machine:

### You'll Need

- Node.js (v18 or newer)
- MongoDB installed locally or a MongoDB Atlas account
- API keys for SerpApi and Stripe (I used free tier for development)

### Setup Steps

1. First, grab the code:

```bash
git clone https://github.com/Hafiz-Muhammad-Furqan/DriveX.git
cd DriveX
```

2. Set up the backend:

```bash
cd Backend
npm install
```

3. Set up the frontend:

```bash
cd ../Frontend
npm install
```

4. Create your environment files:

You'll need two `.env` files - one for backend, one for frontend:

Backend `.env`:

```env
PORT=4000
DB_CONNECT=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
SerpApi_API_KEY=your_serpapi_key
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:4000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

5. Fire it up!

Start the backend:

```bash
cd Backend
npm start
```

Start the frontend:

```bash
cd Frontend
npm run dev
```

And you're all set! The app should now be running at `http://localhost:5173`

## 📱 Key Features & Workflows

### User Workflows

1. **Passenger Flow**

   - Sign up/Sign in
   - Set pickup & destination
   - Choose vehicle type
   - View estimated fare
   - Find a driver
   - Make payment

2. **Driver Flow**
   - Driver registration
   - Accept/Reject rides
   - Navigate to pickup
   - Start/End ride
   - View earnings

### Real-time Features

- Live location tracking
- Instant ride requests
- Dynamic fare updates
- Status updates

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Input validation
- CORS configuration

## 🤝 Want to Contribute?

While this is primarily a personal project, I'm always open to learning from others! If you spot any bugs or have suggestions for improvements:

1. Fork the repo
2. Create a new branch for your idea
3. Make your changes
4. Send a pull request

I'd love to hear your thoughts and learn from your expertise!

## � Get in Touch

Got questions or suggestions? Feel free to:

- Open an issue in this repo
- Connect with me on [LinkedIn](https://www.linkedin.com/in/hafiz-muhammad-furqan) or [hafizfurqan.dev@gmail.com](mailto:hafizfurqan.dev@gmail.com)
- Star the repo if you found it helpful!
