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


router.post(
  "/",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  createBlog
);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put(
  "/:id",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  updateBlog
);
router.delete(
  "/:id",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  deleteBlog
);
router.post("/:id/comments", authenticateToken, addComment);
router.post("/:id/like", authenticateToken, likeBlog);
router.post("/:id/share", authenticateToken, shareBlog);

export { router as blogRoutes };
