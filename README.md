# PropertyConnect

## Introduction
PropertyConnect is a comprehensive real estate management platform that connects buyers, sellers, and agents. Built with React.js frontend and Node.js backend, it offers a seamless user experience with JWT authentication, property management, advanced search capabilities, and direct communication between users.

## Deployed Link
*To be deployed on Vercel/Heroku*

## Directory Structure
```
PropertyConnect/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   └── inquiryController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   └── Inquiry.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── properties.js
│   │   └── inquiries.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── PropertyCard.js
│   │   │   ├── PropertyForm.js
│   │   │   └── SearchFilter.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Properties.js
│   │   │   ├── PropertyDetails.js
│   │   │   └── Favorites.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── App.css
│   └── public/
│       └── index.html
└── README.md
```

## Features
- User authentication with JWT for secure login and registration
- Property listing and management with CRUD operations
- Advanced search and filtering by type, price, location, and amenities
- Favorites system for saving preferred properties
- Property inquiry system for direct communication
- Responsive dashboard for managing properties and inquiries
- Mobile-responsive design ensuring seamless experience across devices

## Dependencies
- **Express.js**: `npm install express`
- **MongoDB & Mongoose**: `npm install mongoose`
- **Authentication**: `npm install bcryptjs jsonwebtoken`
- **React**: `npm install react react-dom`
- **React Router**: `npm install react-router-dom`
- **HTTP Client**: `npm install axios`
- **CORS**: `npm install cors`

## Usage
1. **Setup Backend**: Navigate to backend folder, install dependencies, configure MongoDB URI in .env file
2. **Setup Frontend**: Navigate to frontend folder, install dependencies, configure API URL in .env file
3. **Start Development**: Run `npm run dev` in backend and `npm start` in frontend
4. **Create Account**: Sign up as buyer, seller, or agent to access the platform
5. **Browse Properties**: Use search filters to find properties matching your criteria
6. **Manage Properties**: Add, edit, or delete property listings from your dashboard
7. **Save Favorites**: Click heart icon on properties to add them to your favorites list
8. **Send Inquiries**: Contact property owners directly through the inquiry system

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Frontend**: React.js, React Router, Context API, Axios
- **Authentication**: JWT with bcryptjs password hashing
- **Styling**: CSS3 with responsive design
```