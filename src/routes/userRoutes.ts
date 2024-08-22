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
router.post("/", authenticateToken, restrictTo(), registerUser);
router.get(
  "/",
  authenticateToken,
  restrictTo(),
  getUsers
);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete(
  "/:id",
  authenticateToken,
  restrictTo(),
  deleteUser
);
router.post("/logout", authenticateToken, logoutUser);

export { router as userRoutes };
