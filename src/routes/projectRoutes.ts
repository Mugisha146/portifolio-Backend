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


router.post("/create",authenticateToken, restrictTo, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id",authenticateToken, restrictTo, updateProject);
router.delete("/:id", authenticateToken, restrictTo, deleteProject);

export { router as projectRoutes };
