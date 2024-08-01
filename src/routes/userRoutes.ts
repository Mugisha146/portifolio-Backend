import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
} from "../controllers/userController";
import {authenticateToken, restrictTo } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/", authenticateToken, restrictTo(process.env.EMAILS as string), registerUser);
router.get(
  "/",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  getUsers
);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete(
  "/:id",
  authenticateToken,
  restrictTo(process.env.EMAILS as string),
  deleteUser
);
router.post("/logout", authenticateToken, logoutUser);

export { router as userRoutes };
