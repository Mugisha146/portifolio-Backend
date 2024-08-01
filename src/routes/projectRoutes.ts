import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { authenticateToken, restrictTo } from "../middleware/authMiddleware";

const router = express.Router();


router.post(
  "/create",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  createProject
);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put(
  "/:id",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  updateProject
);
router.delete(
  "/:id",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  deleteProject
);

export { router as projectRoutes };
