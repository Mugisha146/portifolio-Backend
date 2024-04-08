import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

export const User = mongoose.model<UserDocument>("User", userSchema);
