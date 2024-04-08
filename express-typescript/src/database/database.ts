import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/portfolio");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
