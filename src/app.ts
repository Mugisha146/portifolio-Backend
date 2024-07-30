import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.config";
import { contactRoutes } from "./routes/contactRoutes";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { blogRoutes } from "./routes/blogRoutes"; // Import blog routes
import { subscriptionRoutes } from "./routes/subscriptionRoutes";
import { unsubscribeRoutes } from "./routes/unsubscribeRoutes";
import { skillRoutes } from "./routes/skillRoutes";
import { projectRoutes } from "./routes/projectRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// const corsOptions = {
//   origin: "http://example.com", // Replace with your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));


// Middleware to handle CORS
app.use(cors());
// Middleware to serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route configurations
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes); // Use blog routes
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/unsubscribe", unsubscribeRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);


mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: Error) => {
    console.log(error);
  });
    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, mongoose };