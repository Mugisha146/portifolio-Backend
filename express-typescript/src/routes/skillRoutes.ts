// routes/skillRoutes.ts

import express from "express";
import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";

const router = express.Router();

// Create a new skill
router.post("/", createSkill);

// Get all skills
router.get("/", getSkills);

// Get a skill by ID
router.get("/:id", getSkillById);

// Update a skill
router.put("/:id", updateSkill);

// Delete a skill
router.delete("/:id", deleteSkill);

export { router as skillRoutes };
