import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new project
router.post("/",authenticateToken, createProject);

// Get all projects
router.get("/", getAllProjects);

// Get a project by ID
router.get("/:id", getProjectById);

// Update a project
router.put("/:id",authenticateToken, updateProject);

// Delete a project
router.delete("/:id",authenticateToken, deleteProject);

export { router as projectRoutes };
