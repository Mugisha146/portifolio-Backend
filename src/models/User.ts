import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: String,
  rePassword: String,
});

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

export const User = mongoose.model<UserDocument>("User", userSchema);
