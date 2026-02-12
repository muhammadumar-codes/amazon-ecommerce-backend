# 📦 Amazon Backend API

A robust, scalable backend system for an Amazon-clone application. This project demonstrates industry-standard practices including modular architecture, secure authentication, and strict data validation.

---

## 🚀 Overview

This backend provides the core infrastructure for an e-commerce platform. It focuses on security and scalability, ensuring that user data is protected and the codebase remains maintainable as the application grows.

### Key Features

- **User Management:** Full registration and login flow.
- **Secure Auth:** Implementation of **JWT (JSON Web Tokens)** for stateless authentication.
- **Data Integrity:** Request body validation using **Yup**.
- **Security:** Password hashing using **bcrypt**.
- **Modular Design:** Clean separation of concerns (Controllers, Services, Middlewares).
- **Database:** Integrated with **MongoDB** via Mongoose.

---

## 🛠 Tech Stack

| Technology     | Purpose                 |
| :------------- | :---------------------- |
| **Node.js**    | JavaScript Runtime      |
| **Express.js** | Web Framework           |
| **MongoDB**    | NoSQL Database          |
| **Mongoose**   | MongoDB Object Modeling |
| **JWT**        | Secure Authentication   |
| **bcrypt**     | Password Encryption     |
| **Yup**        | Schema Validation       |

---

## 📂 Project Structure

```text
amazon-backend/
│
├── src/
│   ├── config/             # Database & environment configurations
│   ├── controllers/        # Business logic for routes
│   ├── middlewares/        # JWT verification & validation checks
│   ├── models/             # Mongoose schemas (User, etc.)
│   ├── routes/             # API endpoint definitions
│   ├── utils/              # Helper functions (JWT, Hashing)
│   ├── validations/        # Yup validation schemas
│   └── app.js              # Express app setup
│
├── server.js               # Entry point (Starts the server)
├── .env                    # Environment variables (Private)
└── package.json            # Dependencies and scripts

⚙️ Setup & Installation

    Clone the repository:
    Bash

    git clone <your-repo-url>
    cd amazon-backend

    Install dependencies:
    Bash

    npm install

    Configure Environment Variables:
    Create a .env file in the root directory and add:
    Code snippet

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key

    Run the server:
    Bash

    # Development mode
    npm run dev

    # Production mode
    npm start

🔑 Authentication Flow

    Identity: User submits credentials via /register or /login.

    Validation: Yup ensures the data format is correct.

    Hashing: Passwords are encrypted using bcrypt before storage.

    Tokenization: On successful login, the server issues a JWT.

    Authorization: The client sends the JWT in the Authorization header for protected routes.

    Header Format: Authorization: Bearer <your_token>

🔗 API Reference
Auth Endpoints
Register a New User

POST /api/auth/register
Body Field	Type	Description
name	String	User's full name
email	String	Unique email address
password	String	Minimum 6 characters
User Login

POST /api/auth/login

Success Response (200 OK):
JSON

{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbG...",
    "user": {
      "id": "645a...",
      "name": "Umar",
      "email": "umar@example.com",
      "role": "user"
    }
  }
}

🛡️ Middlewares

    auth.middleware.js: Intercepts requests to protected routes, verifies the JWT, and attaches the user payload to req.user.

    validate.middleware.js: A generic middleware that validates the request body against Yup schemas before reaching the controller.

📝 License

This project is licensed under the MIT License.


Would you like me to generate a **Postman Collection** JSON or a specific **Product Model** to expand the API?
```
