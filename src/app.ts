import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.config";
import { contactRoutes } from "./routes/contactRoutes";
import { userRoutes } from "./routes/userRoutes";
import { blogRoutes } from "./routes/blogRoutes"; 
import { subscriptionRoutes } from "./routes/subscriptionRoutes";
import { unsubscribeRoutes } from "./routes/unsubscribeRoutes";
import { skillRoutes } from "./routes/skillRoutes";
import { projectRoutes } from "./routes/projectRoutes";
import connectDB  from "./database/database";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();


app.use(express.json());

// const corsOptions = {
//   origin: "http://example.com", // Replace with your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/unsubscribe", unsubscribeRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app};