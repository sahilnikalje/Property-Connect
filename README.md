# PropertyConnect

PropertyConnect is a comprehensive real estate management platform that simplifies the process of buying, selling, and renting properties. It connects potential buyers and renters with property owners and agents, offering a user-friendly experience to explore the real estate market.

## Features

- User Authentication with JWT
- Property Listings Management
- Advanced Search Filters
- Favorite Listings
- Real-time Notifications
- Rating and Review System
- User and Property Owner Dashboards
- AI-based Fraud Detection
- Inquiry System

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Socket.io for real-time features
- Jest for testing

### Frontend
- React (Vite)
- Redux Toolkit for state management
- Tailwind CSS for styling
- Socket.io-client for real-time features
- React Testing Library for testing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd property-connect
```

2. Install Backend Dependencies
```bash
cd Backend
npm install
```

3. Install Frontend Dependencies
```bash
cd Frontend
npm install
```

4. Set up environment variables
Create `.env` files in both Backend and Frontend directories following the `.env.example` templates.

5. Start the development servers

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

## Project Structure

```
property-connect/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── features/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    ├── tests/
    └── package.json
```

## API Documentation

The API documentation will be available at `/api-docs` when running the backend server.

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.