import { get } from "http";

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
    {
      url: "https://portifolio-backend-api.onrender.com",
      description: "Render server",
    },
  ],
  paths: {
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
    "/api/users/{id}": {
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
    },
    "api/users/create":{
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
    },
      "api/blogs/create": {
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
    "/api/contact/create": {
      "post": {
        "summary": "Create a contact message",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "John Doe"
                  },
                  "email": {
                    "type": "string",
                    "example": "john.doe@example.com"
                  },
                  "message": {
                    "type": "string",
                    "example": "This is a contact message."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Message created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Contact"
                }
              }
            }
          },
          "500": {
            "description": "Error creating contact message"
          }
        }
      },
    },
    "/api/contact": {
      "get": {
        "summary": "Get all contact messages",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "List of contact messages",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Contact"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Error getting contact messages"
          }
        }
      }
    },
    "/api/contact/{id}": {
      "get": {
        "summary": "Get a contact message by ID",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "The ID of the contact message"
          }
        ],
        "responses": {
          "200": {
            "description": "Contact message found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Contact"
                }
              }
            }
          },
          "404": {
            "description": "Message not found"
          },
          "500": {
            "description": "Error getting contact message"
          }
        }
      },
      "put": {
        "summary": "Reply to a contact message",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "The ID of the contact message"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "replied": {
                    "type": "string",
                    "example": "This is a reply message."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Contact message replied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Contact"
                }
              }
            }
          },
          "404": {
            "description": "Message not found"
          },
          "500": {
            "description": "Error replying to contact message"
          }
        }
      },
      "delete": {
        "summary": "Delete a contact message",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "The ID of the contact message"
          }
        ],
        "responses": {
          "204": {
            "description": "Contact message deleted"
          },
          "404": {
            "description": "Message not found"
          },
          "500": {
            "description": "Error deleting contact message"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Contact": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "60d21b8667d0d8992e610c85"
          },
          "name": {
            "type": "string",
            "example": "John Doe"
          },
          "email": {
            "type": "string",
            "example": "john.doe@example.com"
          },
          "message": {
            "type": "string",
            "example": "This is a contact message."
          },
          "replied": {
            "type": "string",
            "example": "This is a reply message."
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      },
    },
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
    },
        "/api/projects/create": {
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
    },
      "/api/skills/create": {
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
};

export default swaggerDocument;
