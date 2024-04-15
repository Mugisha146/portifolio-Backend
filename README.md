Portfolio-backend API

Welcome to the Portfolio-backend API! This API serves as the backend for managing user accounts, blog posts, contact messages, projects, skills, and subscriptions. It provides various endpoints to interact with different entities within the system.

Getting Started

To get started with the Portfolio-backend API, follow these steps:

Clone the Repository: Clone this repository to your local machine using git clone https://github.com/yourusername/portfolio-backend.git.

Install Dependencies: Navigate to the project directory and install dependencies using npm install.

Set Environment Variables: Create a .env file in the root directory and add necessary environment variables. You may need to set variables like PORT, MONGODB_URI, and JWT_SECRET.

Start the Server: Run the command npm start to start the server. By default, the server will run on port 3000 unless specified otherwise in the environment variables.

Explore the API: Once the server is running, you can explore the API endpoints using tools like Postman or cURL.

API Documentation

For detailed documentation on the API endpoints and how to interact with them, refer to the API Documentation.
https://portifolio-backend-api.onrender.com/api-docs

Available Endpoints

/api/users: Endpoint for managing user accounts, including registration, authentication, and profile management.
    POST /api/users: Register a new user.
    GET /api/users: Get all users.
    GET /api/users/:id: Get a specific user by ID.
    PUT /api/users/:id: Update a specific user.
    DELETE /api/users/:id: Delete a specific user.
/api/auth: Endpoint for user authentication, including login and logout functionality.
    POST /api/auth/register: Register a new user.
    POST /api/auth/login: Login an existing user.
    POST /api/auth/logout: Logout the current user.
/api/blogs: Endpoint for managing blog posts, including CRUD operations, commenting, liking, and sharing.
    POST /api/blogs: Create a new blog post.
    GET /api/blogs: Get all blog posts.
    GET /api/blogs/:id: Get a specific blog post by ID.
    PUT /api/blogs/:id: Update a specific blog post.
    DELETE /api/blogs/:id: Delete a specific blog post.
    POST /api/blogs/:id/comment: Add a comment to a specific blog post.
    POST /api/blogs/:id/like: Like a specific blog post.
    POST /api/blogs/:id/share: Share a specific blog post.
/api/contact: Endpoint for sending messages to the administrator and managing contact messages.
    POST /api/contact: Create a new contact message.
    GET /api/contact: Get all contact messages.
    GET /api/contact/:id: Get a specific contact message by ID.
    PUT /api/contact/:id: Reply to a specific contact message.
    DELETE /api/contact/:id: Delete a specific contact message.
/api/subscribe: Endpoint for subscribing to receive updates .
    POST /api/subscribe
/api/unsubscribe: Endpoint for unsubscribing from updates.
    POST /api/unsubscribe
/api/skills: Endpoint for managing user skills, including adding, retrieving, updating, and deleting skills.
    POST /api/skills: Create a new skill.
    GET /api/skills: Get all skills.
    GET /api/skills/:id: Get a specific skill by ID.
    PUT /api/skills/:id: Update a specific skill.
    DELETE /api/skills/:id: Delete a specific skill.
/api/projects: Endpoint for managing user projects, including adding, retrieving, updating, and deleting projects.
    POST /api/projects: Create a new project.
    GET /api/projects: Get all projects.
    GET /api/projects/:id: Get a specific project by ID.
    PUT /api/projects/:id: Update a specific project.
    DELETE /api/projects/:id: Delete a specific project.

Technologies Used

Node.js: Backend JavaScript runtime environment.
Express.js: Web application framework for Node.js used for building APIs.
MongoDB: NoSQL database used for storing data.
Mongoose: MongoDB object modeling for Node.js.
JSON Web Tokens (JWT): Used for user authentication and authorization.
Swagger/OpenAPI: Used for API documentation.

Contributing

Contributions are welcome! If you have suggestions for improvements, please fork the repository and create a pull request with your changes.

