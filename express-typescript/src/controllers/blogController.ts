// blogController.ts

import { Request, Response } from "express";
import { Blog } from "../models/Blog";

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, image, content } = req.body;
    const blog = new Blog({ title, image, content });
    await blog.save();
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating blog");
  }
};

// Get all blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting blogs");
  }
};

// Get a blog by ID
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting blog");
  }
};

// Update a blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const { title, image, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, image, content },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).send("Blog not found");
    }
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating blog");
  }
};

// Delete a blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).send("Blog not found");
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting blog");
  }
};
