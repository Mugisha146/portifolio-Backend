import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://emmyzizo1:0nYxOO4ExcKbxEUI@brand.ppboihq.mongodb.net/portfolio?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

