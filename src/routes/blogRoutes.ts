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
import { authenticateToken, restrictTo } from "../middleware/authMiddleware";
const router = express.Router();


router.post("/create", authenticateToken, restrictTo, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", authenticateToken,restrictTo, updateBlog);
router.delete("/:id", authenticateToken, restrictTo, deleteBlog);
router.post("/:id/comments", authenticateToken, addComment);
router.post("/:id/like", authenticateToken, likeBlog);
router.post("/:id/share", authenticateToken, shareBlog);

export { router as blogRoutes };
