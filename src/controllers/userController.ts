import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../middleware/authMiddleware";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const {name, email, password, rePassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password!== rePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = new User({
      name,
      email,
      password: hashedPassword,
      rePassword: hashedPassword });
    await user.save();
    const token = await generateToken(user);
    
    res.status(201).json(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
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
    const token = await generateToken(user);

    res.status(201).json({
      id: user._id,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting users" });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting user" });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

     if (!name || !email || !password) {
       return res.status(400).json({ message: "Email & Password is required" });
     }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      userId,

      { name, email, password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};


export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
