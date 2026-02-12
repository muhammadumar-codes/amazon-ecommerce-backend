📝 Amazon Backend API

This repository contains the backend for an Amazon-like application, built to demonstrate scalable architecture, authentication, authorization, validation, and modular design.

This README explains everything in plain language, so anyone (including your future self) can understand the system without confusion.

What This Backend Does

This backend currently supports:

User registration and login

Secure authentication using JWT

Request validation using Yup

Protected routes with JWT middleware

MongoDB database connection

Modular and scalable project structure

Only authenticated users can access protected routes.

Tech Stack

Node.js – JavaScript runtime

Express.js – Web framework

MongoDB + Mongoose – Database and ODM

JWT (JSON Web Tokens) – Authentication

bcrypt – Password hashing

Yup – Request body validation

dotenv – Environment variables

📁 Project Structure
amazon-backend/
│
├── src/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ │
│ ├── controllers/
│ │ └── auth.controller.js # Auth business logic
│ │
│ ├── middlewares/
│ │ ├── auth.middleware.js # JWT token verification
│ │ └── validate.middleware.js # Yup validation middleware
│ │
│ ├── models/
│ │ └── user.model.js # User schema
│ │
│ ├── routes/
│ │ └── auth.routes.js # Auth API endpoints
│ │
│ ├── utils/
│ │ ├── hash.util.js # Password hashing logic
│ │ └── jwt.util.js # JWT token generation
│ │
│ ├── validations/
│ │ └── auth.validation.js # Yup validation schemas
│ │
│ └── app.js # Express app configuration
│
├── server.js # Starts the server
├── .env # Environment variables
├── package.json
└── README.md

Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

Never commit .env to GitHub. Keep secrets safe.

Database Connection

Handled in src/config/db.js

Connects to MongoDB using Mongoose

Logs success or error

Stops server if connection fails

👤 User Model

The user schema defines how users are stored in the database.

Main fields:

name – Full name

email – Unique email

password – Hashed password

role – Default "user"

timestamps – CreatedAt & UpdatedAt

Passwords are always hashed before saving.

🔑 Authentication Flow (JWT)

User registers or logs in

Backend verifies credentials

A JWT token is generated

Token is returned to the frontend

Frontend sends token in Authorization header for protected routes

Example:

Authorization: Bearer <token>

🛡️ Auth Middleware

Checks if:

A token exists

Token is valid

If valid:

req.user is attached

Request continues

If invalid:

Access is denied

Protects private routes like /api/auth/protected.

🔗 API Routes
Auth Routes (/api/auth)
Register
POST /api/auth/register

Request body:

{
"name": "Umar",
"email": "umar@example.com",
"password": "123456"
}

Response:

{
"success": true,
"message": "User registered successfully",
"data": {
"id": "user_id",
"name": "Umar",
"email": "umar@example.com",
"role": "user"
}
}

Login
POST /api/auth/login

Request body:

{
"email": "umar@example.com",
"password": "123456"
}

Response:

{
"success": true,
"message": "Login successful",
"data": {
"accessToken": "jwt_token_here",
"user": {
"id": "user_id",
"name": "Umar",
"email": "umar@example.com",
"role": "user"
}
}
}

⚙️ app.js

This file:

Initializes Express app

Enables JSON body parsing

Connects routes

Does not start the server.

🌍 server.js

This file:

Loads environment variables

Connects to MongoDB

Starts the server

Separation ensures clean architecture.
