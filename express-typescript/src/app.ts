import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up MongoDB connection
mongoose.connect("mongodb://localhost:27017/portfolio");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const User = mongoose.model<UserDocument>("User", userSchema);

// Register route
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// Get the logged-in user's ID from the JWT token
function getUserIdFromToken(token: string): string | null {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded?.email || null;
  } catch (error) {
    return null;
  }
}


// Login route
const JWT_SECRET = "emmyzizo1"; // Change this to a strong, random secret

// Login route
app.post("/api/login", async (req: Request, res: Response) => {
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
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Create a new user (admin only)
app.post(
  "/api/users",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

// Get all users (admin only)
app.get(
  "/api/users",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const email = req.user.email;
      if (email !== "emmyzizo1@gmail.com") {
        return res.status(403).send("Forbidden");
      }
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error getting users");
    }
  }
);

// Get the logged-in user's info
app.get(
  "/api/users/me",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

// Update the logged-in user's info
app.put(
  "/api/users/me",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);
// Delete a specific user by ID (admin only)
app.delete("/api/users/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    
    // Check if the logged-in user is an admin
    const loggedInUserEmail = req.user.email;
    if (loggedInUserEmail !== "emmyzizo1@gmail.com") {
      return res.status(403).send("Forbidden");
    }
    
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    
    res.sendStatus(204); // Success response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
});

// Delete the logged-in user
app.delete("/api/users/me", authenticateToken, async (req: Request, res: Response) => {
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


// Middleware to authenticate token
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route using the middleware
app.get("/api/data", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Authenticated data" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


















































