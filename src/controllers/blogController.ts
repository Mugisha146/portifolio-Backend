import { Request, Response } from "express";
import { Blog } from "../models/Blog";
import { Comment } from "../models/comment";

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

// Controller method to add a comment to a blog
export const addComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Create a new Comment document
    const comment = new Comment({ text });
    await comment.save();

    // Find the corresponding blog by its ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    // Push the ObjectId reference of the newly created comment into the comments array of the blog
    blog.comments.push(comment.id);

    // Save the updated blog document
    await blog.save();

    // Send the updated blog document as the response
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding comment to blog");
  }
};

// Controller method to like a blog
export const likeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    blog.likes += 1; // Increment likes count
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error liking blog");
  }
};

// Controller method to share a blog
export const shareBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    blog.shares += 1; // Increment shares count
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sharing blog");
  }
};
