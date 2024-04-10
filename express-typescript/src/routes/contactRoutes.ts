import express from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  replyToMessage,
  deleteMessage,
} from "../controllers/contactController";

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);
router.get("/:id", getMessageById);
router.put("/:id/reply", replyToMessage);
router.delete("/:id", deleteMessage);

export { router as contactRoutes };
