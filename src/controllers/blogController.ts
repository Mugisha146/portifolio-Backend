import { Request, Response } from "express";
import { Blog } from "../models/Blog";
import { Comment } from "../models/comment";
import sendNotifications from "../utils/sendNotifications";


export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, image, content } = req.body;
    const blog = new Blog({ title, image, content });
    await blog.save();
     await sendNotifications(blog);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating blog");
  }
};


export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting blogs");
  }
};


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


export const addComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = new Comment({ text });
    await comment.save();

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    blog.comments.push(comment.id);
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding comment to blog");
  }
};


export const likeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    blog.likes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error liking blog");
  }
};


export const shareBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    blog.shares += 1; 
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sharing blog");
  }
};
