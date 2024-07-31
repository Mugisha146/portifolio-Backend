import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {authenticateToken, restrictTo } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/create", authenticateToken, restrictTo, registerUser);
router.get("/", authenticateToken,restrictTo, getUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken,restrictTo, deleteUser);


export { router as userRoutes };
