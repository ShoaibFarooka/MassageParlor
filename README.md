# Massage Parlor Management System

## Overview
This project is a full-stack web application designed to manage the operations of a massage parlor. It provides features for user authentication, booking management, service provider management, company information, and more. The system is built with a modern React frontend and a Node.js/Express backend, utilizing RESTful APIs and a modular architecture for scalability and maintainability.

## Features
- **User Authentication:** Secure login, registration, password reset, and change password functionality.
- **Role-Based Access:** Admin, service provider, and user roles with protected routes and access control.
- **Booking System:** Users can book services, view booking history, and manage appointments.
- **Service Management:** Admins can add, update, and delete services offered by the parlor.
- **Gallery:** Manage and display images of the parlor and services.
- **Profile Management:** Users and service providers can update their profiles and company information.
- **Subscription & Payments:** Integration with Stripe for handling payments and subscriptions.
- **Notifications:** Email notifications for booking confirmations, password resets, and other events.
- **Admin Dashboard:** Overview of bookings, users, services, and analytics.
- **Responsive UI:** Built with Tailwind CSS for a modern, mobile-friendly interface.

## Technologies Used
### Frontend
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Stripe API
- Nodemailer
- Multer (file uploads)

## Project Structure
```
client/         # Frontend React application
server/         # Backend Node.js/Express API
```

### Client
- `src/components/` - Reusable UI components
- `src/pages/` - Page-level components for different user roles
- `src/redux/` - State management
- `src/services/` - API service handlers
- `src/router/` - Routing configuration

### Server
- `controllers/` - Request handlers for each resource
- `models/` - Mongoose models for MongoDB
- `routes/` - API route definitions
- `services/` - Business logic and integrations
- `middleware/` - Express middleware for auth, validation, error handling
- `configs/` - Configuration files (DB, Stripe, etc.)
- `seed/` - Database seeders
- `templates/` - Email templates
- `utils/` - Utility functions

## Setup Instructions
### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance

### Installation
1. **Clone the repository:**
   ```powershell
   git clone https://github.com/ShoaibFarooka/MassageParlor.git
   cd MassageParlor
   ```
2. **Install dependencies:**
   ```powershell
   cd client; npm install; cd ../server; npm install
   ```
3. **Configure environment variables:**
   - Create `.env` files in both `client` and `server` directories as needed (see sample `.env.example` if provided).
4. **Seed the database (optional):**
   ```powershell
   node server/seed/adminSeeder.js
   ```
5. **Start the backend server:**
   ```powershell
   cd server; npm start
   ```
6. **Start the frontend development server:**
   ```powershell
   cd client; npm run dev
   ```
7. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a Pull Request

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please contact [Shoaib Farooka](mailto:shoaibfarooka@gmail.com).

---
**Massage Parlor Management System** streamlines business operations, enhances customer experience, and provides robust tools for service providers and administrators.
