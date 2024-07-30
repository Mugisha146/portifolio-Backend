const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for the application",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  paths: {
    // User Endpoints
    "/api/users/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "user@gmail.com",
                  },
                  password: {
                    type: "string",
                    example: "password123",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "60d0fe4f5311236168a109ca",
                    },
                    email: {
                      type: "string",
                      example: "user@gmail.com",
                    },
                    token: {
                      type: "string",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                    },
                  },
                  required: ["id", "email", "token"],
                },
              },
            },
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/users/login": {
      post: {
        summary: "Login a user",
        description: "Authenticate a user and return a JWT token.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" },
                  password: { type: "string", example: "password123" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Invalid credentials" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/users/me": {
      get: {
        summary: "Get current user's information",
        description: "Retrieve information about the currently logged-in user.",
        responses: {
          "200": {
            description: "User information retrieved successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
        security: [{ bearerAuth: [] }],
      },
      put: {
        summary: "Update current user's information",
        description: "Update the information of the currently logged-in user.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          "200": {
            description: "User information updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
        security: [{ bearerAuth: [] }],
      },
      delete: {
        summary: "Delete current user account",
        description: "Remove the account of the currently logged-in user.",
        responses: {
          "204": { description: "User account deleted successfully" },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/api/users": {
      get: {
        summary: "Get all users (admin only)",
        description: "Retrieve a list of all users.",
        responses: {
          "200": {
            description: "List of users retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
          "403": { description: "Forbidden" },
        },
        security: [{ bearerAuth: [] }],
      },
      post: {
        summary: "Create a new user",
        description: "Create a new user account.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        summary: "Get a user by ID",
        description: "Retrieve a user by their ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "404": { description: "User not found" },
        },
        security: [{ bearerAuth: [] }],
      },
      put: {
        summary: "Update a user",
        description: "Update the details of a user by their ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          "200": {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "404": { description: "User not found" },
        },
        security: [{ bearerAuth: [] }],
      },
      delete: {
        summary: "Delete a user",
        description: "Delete a user by their ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": { description: "User deleted successfully" },
          "404": { description: "User not found" },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    // Blog Endpoints
    "/api/blogs": {
      get: {
        summary: "Get all blogs",
        responses: {
          "200": {
            description: "A list of blogs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Blog" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new blog (admin only)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Blog" },
            },
          },
        },
        responses: {
          "201": {
            description: "Blog created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Blog" },
              },
            },
          },
          "403": { description: "Forbidden" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/api/blogs/{id}": {
      get: {
        summary: "Get a blog by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Blog found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Blog" },
              },
            },
          },
          "404": { description: "Blog not found" },
        },
      },
      put: {
        summary: "Update a blog (admin only)",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Blog" },
            },
          },
        },
        responses: {
          "200": {
            description: "Blog updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Blog" },
              },
            },
          },
          "403": { description: "Forbidden" },
          "404": { description: "Blog not found" },
        },
        security: [{ bearerAuth: [] }],
      },
      delete: {
        summary: "Delete a blog (admin only)",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": { description: "No Content" },
          "403": { description: "Forbidden" },
          "404": { description: "Blog not found" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/api/blogs/{id}/comments": {
      post: {
        summary: "Add a comment to a blog",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { content: { type: "string" } },
              },
            },
          },
        },
        responses: {
          "201": { description: "Comment added" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/api/blogs/{id}/like": {
      post: {
        summary: "Like a blog",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Blog liked" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/api/blogs/{id}/share": {
      post: {
        summary: "Share a blog",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Blog shared" },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    // Contact Endpoints
    "/api/contact": {
      post: {
        summary: "Create a contact message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "John Doe" },
                  email: { type: "string", example: "john.doe@example.com" },
                  message: {
                    type: "string",
                    example: "This is a contact message.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Message created" },
        },
      },
    },

    // Project Endpoints
    "/api/projects": {
      get: {
        summary: "Get all projects",
        responses: {
          "200": {
            description: "A list of projects",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Project" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new project (admin only)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Project" },
            },
          },
        },
        responses: {
          "201": {
            description: "Project created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Project" },
              },
            },
          },
          "403": { description: "Forbidden" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/api/projects/{id}": {
      get: {
        summary: "Get a project by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Project found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Project" },
              },
            },
          },
          "404": { description: "Project not found" },
        },
      },
      put: {
        summary: "Update a project (admin only)",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Project" },
            },
          },
        },
        responses: {
          "200": {
            description: "Project updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Project" },
              },
            },
          },
          "403": { description: "Forbidden" },
          "404": { description: "Project not found" },
        },
        security: [{ bearerAuth: [] }],
      },
      delete: {
        summary: "Delete a project (admin only)",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": { description: "No Content" },
          "403": { description: "Forbidden" },
          "404": { description: "Project not found" },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    // Skill Endpoints
    "/api/skills": {
      get: {
        summary: "Get all skills",
        responses: {
          "200": {
            description: "A list of skills",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Skill" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new skill (admin only)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Skill" },
            },
          },
        },
        responses: {
          "201": {
            description: "Skill created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Skill" },
              },
            },
          },
          "403": { description: "Forbidden" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/api/skills/{id}": {
      get: {
        summary: "Get a skill by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Skill found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Skill" },
              },
            },
          },
          "404": { description: "Skill not found" },
        },
      },
      put: {
        summary: "Update a skill (admin only)",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Skill" },
            },
          },
        },
        responses: {
          "200": {
            description: "Skill updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Skill" },
              },
            },
          },
          "403": { description: "Forbidden" },
          "404": { description: "Skill not found" },
        },
        security: [{ bearerAuth: [] }],
      },
      delete: {
        summary: "Delete a skill (admin only)",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": { description: "No Content" },
          "403": { description: "Forbidden" },
          "404": { description: "Skill not found" },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    // Subscription Endpoints
    "/api/subscribe": {
      post: {
        summary: "Subscribe to notifications",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Subscribed successfully" },
        },
      },
    },
    "/api/unsubscribe": {
      post: {
        summary: "Unsubscribe from notifications",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Unsubscribed successfully" },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", example: "60d0fe4f5311236168a109ca" },
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john.doe@example.com" },
          password: { type: "string", example: "password123" },
          role: { type: "string", example: "user" },
        },
      },
      Blog: {
        type: "object",
        properties: {
          id: { type: "string", example: "60d0fe4f5311236168a109cb" },
          title: { type: "string", example: "My First Blog" },
          content: {
            type: "string",
            example: "This is the content of the blog.",
          },
          author: { type: "string", example: "John Doe" },
        },
      },
      Project: {
        type: "object",
        properties: {
          id: { type: "string", example: "60d0fe4f5311236168a109cc" },
          name: { type: "string", example: "Project Name" },
          description: {
            type: "string",
            example: "This is a project description.",
          },
        },
      },
      Skill: {
        type: "object",
        properties: {
          id: { type: "string", example: "60d0fe4f5311236168a109cd" },
          name: { type: "string", example: "JavaScript" },
          level: { type: "string", example: "Advanced" },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default swaggerDocument;
