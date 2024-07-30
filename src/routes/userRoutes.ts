import express from "express";
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { generateToken, authenticateToken } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken";
import { User } from "../models/User"; // Import the User model

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    const token = await generateToken(user);
    
    res.sendStatus(201).json({
      id: user._id,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    const JWT_SECRET = process.env.SECRETS as string;
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Create a new user (admin only)
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

// Get all users (admin only)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    if (email !== (process.env.EMAILS as string)) {
      return res.status(403).send("Forbidden");
    }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting users");
  }
});

// Get the logged-in user's info
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting user");
  }
});

// Update the logged-in user's info
router.put("/me", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
});

// Delete a specific user by ID (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if the logged-in user is an admin
    const loggedInUserEmail = req.user.email;
    if (loggedInUserEmail !== (process.env.EMAILS as string)) {
      return res.status(403).send("Forbidden");
    }
    
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    
    res.sendStatus(204).send("Deleted successfully"); // Success response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
});

// Delete the logged-in user
router.delete("/me", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
});


// Other user-related routes
router.post("/", authenticateToken, registerUser);
router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export { router as userRoutes };
