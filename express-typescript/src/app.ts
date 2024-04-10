import express from "express";
import { connectDatabase } from "./database/database";
import { contactRoutes } from "./routes/contactRoutes";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { blogRoutes } from "./routes/blogRoutes"; // Import blog routes
import { subscriptionRoutes } from "./routes/subscriptionRoutes";
import { unsubscribeRoutes } from "./routes/unsubscribeRoutes"; 
import { skillRoutes } from "./routes/skillRoutes"; 
import { projectRoutes } from "./routes/projectRoutes"; 

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes); 
app.use("/api/contact", contactRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/unsubscribe", unsubscribeRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
