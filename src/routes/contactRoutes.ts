import express from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  replyToMessage,
  deleteMessage,
} from "../controllers/contactController";
import { authenticateToken, restrictTo } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createMessage);
router.get("/",authenticateToken, getMessages);
router.get("/:id",authenticateToken, getMessageById);
router.put("/:id/reply",authenticateToken, replyToMessage);
router.delete(
  "/:id",
  authenticateToken,
  restrictTo(),
  deleteMessage
);

export { router as contactRoutes };
