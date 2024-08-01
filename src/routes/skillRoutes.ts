// routes/skillRoutes.ts

import express from "express";
import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";
import { authenticateToken, restrictTo } from "../middleware/authMiddleware";

const router = express.Router();


router.post(
  "/create",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  createSkill
);
router.get("/", getSkills);
router.get("/:id", getSkillById);
router.put(
  "/:id",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  updateSkill
);
router.delete(
  "/:id",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  deleteSkill
);

export { router as skillRoutes };
