// Blog.ts

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
});

export interface BlogDocument extends mongoose.Document {
  title: string;
  image: string;
  content: string;
}

export const Blog = mongoose.model<BlogDocument>("Blog", blogSchema);
