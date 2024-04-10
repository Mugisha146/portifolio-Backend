import mongoose from "mongoose";

interface BlogDocument extends mongoose.Document {
  title: string;
  image: string;
  content: string;
  comments: string[]; // Array of comment IDs
  likes: number;
  shares: number;
}

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
});

const Blog = mongoose.model<BlogDocument>("Blog", blogSchema);

export { Blog };
