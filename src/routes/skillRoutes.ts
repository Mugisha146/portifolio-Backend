// routes/skillRoutes.ts

import express from "express";
import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new skill
router.post("/",authenticateToken, createSkill);

// Get all skills
router.get("/", getSkills);

// Get a skill by ID
router.get("/:id", getSkillById);

// Update a skill
router.put("/:id",authenticateToken, updateSkill);

// Delete a skill
router.delete("/:id",authenticateToken, deleteSkill);

export { router as skillRoutes };
