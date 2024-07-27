## Portfolio-backend API

## How to use portfolio-backend API

## Table of contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [API Documentation](#api-details)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

  # Introduction
  
Welcome to the Portfolio-backend API! This API serves as the backend for managing user accounts, blog posts, contact messages, projects, skills, and subscriptions. It provides various endpoints to interact with different entities within the system and built with Node.js and MongoDB.

# Getting Started
To get started with the Portfolio-backend API, follow these steps:

# Installation

To get started with the Portfolio-backend API, follow these steps:

1.Clone the Repository:

```bash
git clone https://github.com/Mugisha146/portfolio-backend.git
```
2. Navigate to the project directory:

 ```bash
 cd portfolio-backend
 ```
3.Install Dependencies:

```bash
npm install
```

4.Set Environment Variables: Create a .env file in the root directory and add necessary environment variables. You may need to set variables like PORT, MONGODB_URI, and JWT_SECRET.

5. Build the project:

```bash
npm run build
```

6.Start the Server:

```bash
npm start 
```

7.Explore the API: Once the server is running, you can explore the API endpoints using tools like Postman or swagger.

# API Documentation

For detailed documentation on the API endpoints and how to interact with them, refer to the API Documentation.
[swagger API documentation](https://portifolio-backend-api.onrender.com/api-docs)

# Prefer Postman here's Available Endpoints:

- **https://portifolio-backend-api.onrender.com/api/users**: Endpoint for managing user accounts, including registration, authentication, and profile management.

    - POST /api/users: Register a new user.
    - GET /api/users: Get all users.
    - GET /api/users/:id: Get a specific user by ID.
    - PUT /api/users/:id: Update a specific user.
    - DELETE /api/users/:id: Delete a specific user.
    
- **https://portifolio-backend-api.onrender.com/api/auth**: Endpoint for user authentication, including login and logout functionality.

    - POST /api/auth/register: Register a new user.
    - POST /api/auth/login: Login an existing user.
    - POST /api/auth/logout: Logout the current user.
    
- **https://portifolio-backend-api.onrender.com/api/blogs**: Endpoint for managing blog posts, including CRUD operations, commenting, liking, and sharing.

    - POST /api/blogs: Create a new blog post.
    - GET /api/blogs: Get all blog posts.
    - GET /api/blogs/:id: Get a specific blog post by ID.
    - PUT /api/blogs/:id: Update a specific blog post.
    - DELETE /api/blogs/:id: Delete a specific blog post.
    - POST /api/blogs/:id/comment: Add a comment to a specific blog post.
    - POST /api/blogs/:id/like: Like a specific blog post.
    - POST /api/blogs/:id/share: Share a specific blog post.
    
- **https://portifolio-backend-api.onrender.com/api/contact**: Endpoint for sending messages to the administrator and managing contact messages.

    - POST /api/contact: Create a new contact message.
    - GET /api/contact: Get all contact messages.
    - GET /api/contact/:id: Get a specific contact message by ID.
    - PUT /api/contact/:id: Reply to a specific contact message.
    - DELETE /api/contact/:id: Delete a specific contact message.
    
- **https://portifolio-backend-api.onrender.com/api/subscribe**: Endpoint for subscribing to receive updates .

    - POST /api/subscribe
    
- **https://portifolio-backend-api.onrender.com/api/unsubscribe**: Endpoint for unsubscribing from updates.

    - POST /api/unsubscribe
    
- **https://portifolio-backend-api.onrender.com/api/skills**: Endpoint for managing user skills, including adding, retrieving, updating, and deleting skills.

    - POST /api/skills: Create a new skill.
    - GET /api/skills: Get all skills.
    - GET /api/skills/:id: Get a specific skill by ID.
    - PUT /api/skills/:id: Update a specific skill.
    - DELETE /api/skills/:id: Delete a specific skill.
    
- **https://portifolio-backend-api.onrender.com/api/projects**: Endpoint for managing user projects, including adding, retrieving, updating, and deleting projects.

    - POST /api/projects: Create a new project.
    - GET /api/projects: Get all projects.
    - GET /api/projects/:id: Get a specific project by ID.
    - PUT /api/projects/:id: Update a specific project.
    - DELETE /api/projects/:id: Delete a specific project.

# Running Tests

How to run tests:

```bash
$ npm run test
```

# Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js used for building APIs.
- **MongoDB**: NoSQL database used for storing data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JSON Web Tokens (JWT)**: Used for user authentication and authorization.
- **Swagger/OpenAPI**: Used for API documentation.

# Contributing

Contributions are welcome! If you have suggestions for improvements, please fork the repository and create a pull request with your changes.

