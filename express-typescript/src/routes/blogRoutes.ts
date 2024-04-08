// blogRoutes.ts

import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new blog (admin only)
router.post("/", authenticateToken, async (req, res) => {
  // Check if the user is an admin
  const email = req.user.email;
  if (email !== "emmyzizo1@gmail.com") {
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
  if (email !== "emmyzizo1@gmail.com") {
    return res.status(403).send("Forbidden");
  }
  updateBlog(req, res);
});

// Delete a blog (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  // Check if the user is an admin
  const email = req.user.email;
  if (email !== "emmyzizo1@gmail.com") {
    return res.status(403).send("Forbidden");
  }
  deleteBlog(req, res);
});

export { router as blogRoutes };
