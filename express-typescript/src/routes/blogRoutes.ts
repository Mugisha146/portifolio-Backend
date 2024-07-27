// blogRoutes.ts

import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById, 
  updateBlog,
  deleteBlog,
  addComment,
  likeBlog,
  shareBlog,
} from "../controllers/blogController";
import { authenticateToken } from "../middleware/authMiddleware";
import sendNotifications from "../utils/sendNotifications"; // Import sendNotifications
const router = express.Router();

// Create a new blog (admin only)
router.post("/", authenticateToken, async (req, res) => {
  // Check if the user is an admin
  const email = req.user.email;
  if (email !== (process.env.EMAILS as string)) {
    return res.status(403).send("Forbidden");
  }
  createBlog(req, res);
});

// Get all blogs
router.get("/", getBlogs);

// Get a blog by ID
router.get("/:id", getBlogById);

// Update a blog (admin only)
router.put("/:id", authenticateToken, async (req, res) => {
  // Check if the user is an admin
  const email = req.user.email;
  if (email !== (process.env.EMAILS as string)) {
    return res.status(403).send("Forbidden");
  }
  updateBlog(req, res);
});

// Delete a blog (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  // Check if the user is an admin
  const email = req.user.email;
  if (email !== (process.env.EMAILS as string)) {
    return res.status(403).send("Forbidden");
  }
  deleteBlog(req, res);
});

// New routes for comment, like, and share
router.post("/:id/comments", authenticateToken, addComment);
router.post("/:id/like", authenticateToken, likeBlog);
router.post("/:id/share", authenticateToken, shareBlog);

// Endpoint to create a new blog post and send notifications
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newBlog = await createBlog(req, res); // Create new blog
    await sendNotifications(newBlog); // Send notifications
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as blogRoutes };
