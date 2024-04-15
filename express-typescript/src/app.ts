import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { connectDatabase } from "./database/database";
import { contactRoutes } from "./routes/contactRoutes";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { blogRoutes } from "./routes/blogRoutes"; // Import blog routes
import { subscriptionRoutes } from "./routes/subscriptionRoutes";
import { unsubscribeRoutes } from "./routes/unsubscribeRoutes";
import { skillRoutes } from "./routes/skillRoutes";
import { projectRoutes } from "./routes/projectRoutes";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Portfolio-backend API",
    description:
      "My API is for my capstone project/my brand that includes user, blog, contact, project, skills, and subscription",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/api/users": {
      get: {
        summary: "Get all users",
        responses: {
          "200": {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a user",
        responses: {
          "204": {
            description: "No Content",
          },
        },
      },
    },
    "/api/users/{userId}": {
      get: {
        summary: "Get a user by ID",
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            description: "ID of the user to get",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          "404": {
            description: "User not found",
          },
        },
      },
      put: {
        summary: "Update a user by ID",
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            description: "ID of the user to update",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          "404": {
            description: "User not found",
          },
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
                  items: {
                    $ref: "#/components/schemas/Blog",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new blog",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
        },
      },
    },
    "/api/blogs/{blogId}": {
      delete: {
        summary: "Delete a blog by ID",
        parameters: [
          {
            in: "path",
            name: "blogId",
            required: true,
            description: "ID of the blog to delete",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "204": {
            description: "Blog deleted successfully",
          },
          "404": {
            description: "Blog not found",
          },
        },
      },
    },
    "/api/blogs/{blogId}/comments": {
      post: {
        summary: "Add a comment to a blog",
        parameters: [
          {
            in: "path",
            name: "blogId",
            required: true,
            description: "ID of the blog to add a comment to",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Comment",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Comment added successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
          "404": {
            description: "Blog not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/blogs/{blogId}/like": {
      post: {
        summary: "Like a blog",
        parameters: [
          {
            in: "path",
            name: "blogId",
            required: true,
            description: "ID of the blog to like",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Blog liked successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
          "404": {
            description: "Blog not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/blogs/{blogId}/share": {
      post: {
        summary: "Share a blog",
        parameters: [
          {
            in: "path",
            name: "blogId",
            required: true,
            description: "ID of the blog to share",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Blog shared successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
          "404": {
            description: "Blog not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },

    "/api/contact": {
      get: {
        summary: "Get all contact messages",
        responses: {
          "200": {
            description: "A list of contact messages",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Contact",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new contact message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Contact",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
        },
      },
    },
    "/api/contact/{contactId}": {
      get: {
        summary: "Get a contact message by ID",
        parameters: [
          {
            in: "path",
            name: "contactId",
            required: true,
            description: "ID of the contact message to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Contact message retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
          "404": {
            description: "Contact message not found",
          },
        },
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
                  items: {
                    $ref: "#/components/schemas/Project",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new project",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Project",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Project",
                },
              },
            },
          },
        },
      },
    },
    "/api/projects/{projectId}": {
      get: {
        summary: "Get a project by ID",
        parameters: [
          {
            in: "path",
            name: "projectId",
            required: true,
            description: "ID of the project to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Project retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Project",
                },
              },
            },
          },
          "404": {
            description: "Project not found",
          },
        },
      },
      delete: {
        summary: "Delete a project by ID",
        parameters: [
          {
            in: "path",
            name: "projectId",
            required: true,
            description: "ID of the project to delete",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "204": {
            description: "Project deleted successfully",
          },
          "404": {
            description: "Project not found",
          },
        },
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
                  items: {
                    $ref: "#/components/schemas/Skill",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new skill",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Skill",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Skill",
                },
              },
            },
          },
        },
      },
    },
    "/api/skills/{skillId}": {
      get: {
        summary: "Get a skill by ID",
        parameters: [
          {
            in: "path",
            name: "skillId",
            required: true,
            description: "ID of the skill to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Skill retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Skill",
                },
              },
            },
          },
          "404": {
            description: "Skill not found",
          },
        },
      },
      delete: {
        summary: "Delete a skill by ID",
        parameters: [
          {
            in: "path",
            name: "skillId",
            required: true,
            description: "ID of the skill to delete",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "204": {
            description: "Skill deleted successfully",
          },
          "404": {
            description: "Skill not found",
          },
        },
      },
    },

    "/api/subscribe": {
      // Subscription endpoint
      post: {
        summary: "Subscribe to notifications",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Subscription successful",
          },
        },
      },
    },
    "/api/unsubscribe": {
      // Unsubscription endpoint
      delete: {
        summary: "Unsubscribe from notifications",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Unsubscription successful",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
        },
      },
      Blog: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          title: {
            type: "string",
          },
          image: {
            type: "string",
          },
          content: {
            type: "string",
          },
        },
      },
      Contact: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          message: {
            type: "string",
          },
          replied: {
            type: "string",
          },
        },
      },
      Project: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          image: {
            type: "string",
          },
        },
      },
      Skill: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          percentage: {
            type: "integer",
          },
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
connectDatabase();

// Routes
// Welcome endpoint
app.get("/api", (req, res) => {
  res.send(`
   Welcome to Portfolio-backend API! 
    For detailed documentation, please refer to our API documentation: https://portifolio-backend-api.onrender.com/api-docs
  `);
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/unsubscribe", unsubscribeRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
